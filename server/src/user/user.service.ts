import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "src/message/schemas/message.schemas";
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Role } from "./roles/role.enum";
import { SecurityUser } from "./schemas/security-user.schemas";
import { User, UserDocument } from "./schemas/user.schemas";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>
  ) { }

  async getAll(): Promise<SecurityUser[] | any[]> {
    let allUsers = await this.userModel.find().exec();

    return allUsers.map((user: User) => {
      return UserService.serializeUser(user);
    });
  }

  async getByLogin(login: string, password: string): Promise<User | null> {
    let user = await this.userModel.findOne({ login });

    if (user && user.password == password) {
      return user;
    } else {
      return null;
    }
  }

  async getOtherUsers(currentLogin: string): Promise<SecurityUser[] | null> {
    let allUsers = await this.getAll();

    if (allUsers.length) {
      return allUsers.filter((user: SecurityUser) => user.login !== currentLogin);
    } else {
      return null;
    }
  }

  async create(userDto: CreateUserDto): Promise<User | null> {
    let newUser = new this.userModel(userDto);
    let users = await this.getAll();
    newUser._id = uuidv4();

    if (!users.length) {
      newUser.post = Role.Admin;
      return newUser.save();
    } else if (UserService.sameLogin(users, newUser.login)) {
      return null;
    } else {
      newUser.post = Role.User;
      return newUser.save();
    }
  }

  async update(login: string, password: string, userDto: UpdateUserDto): Promise<User | null> {
    let user = await this.getByLogin(login, password);
    let otherUsers = await this.getOtherUsers(login);
    let sameLogin = UserService.sameLogin(otherUsers, userDto.login);

    if (user && !sameLogin) {
      return await this.userModel.findOneAndUpdate({ login }, userDto, { new: true });
    } else {
      return null;
    }
  }

  async setBan(id: string, login: string, password: string): Promise<SecurityUser | null> {
    let user = await this.getByLogin(login, password);
    let bannedUser = await this.userModel.findById({ _id: id });
    let isLowerInPost = user.post == Role.Admin || user.post == Role.Moderator && bannedUser.post == Role.User;

    if (user && !user.banned && user._id != id && isLowerInPost) {
      let updateUser = await this.userModel.findByIdAndUpdate({ _id: id }, { banned: !bannedUser.banned }, { new: true });
      return UserService.serializeUser(updateUser);
    } else {
      return null;
    }
  }

  async setModerator(id: string, login: string, password: string): Promise<SecurityUser | null> {
    let user = await this.getByLogin(login, password);
    let updatePost = (await this.userModel.findById({ _id: id })).post == Role.Moderator ? Role.User : Role.Moderator;

    if (user && user._id != id && user.post == Role.Admin) {
      let updateUser = await this.userModel.findByIdAndUpdate({ _id: id }, { post: updatePost }, { new: true });
      return UserService.serializeUser(updateUser);
    } else {
      return null;
    }
  }

  async transferAdmin(id: string, login: string, password: string): Promise<SecurityUser | null> {
    let user = await this.getByLogin(login, password);

    if (user && user.post == Role.Admin) {
      await this.userModel.findByIdAndUpdate({ _id: user._id }, { post: Role.Moderator }, { new: true });

      let updateUser = await this.userModel.findByIdAndUpdate({ _id: id }, { post: Role.Admin, banned: false }, { new: true });
      return UserService.serializeUser(updateUser);
    }
  }

  async removeUser(id: string, login: string, password: string): Promise<User | null> {
    let user = await this.getByLogin(login, password);

    if (user && user.post == Role.Admin) {
      await this.messageModel.deleteMany({ authorId: id });

      return await this.userModel.findByIdAndRemove({ _id: id });
    } else {
      return null;
    }
  }

  async removeAccount(id: string, login: string, password: string): Promise<User | null> {
    let user = await this.getByLogin(login, password);
    let otherUsers = await this.getOtherUsers(login);

    if (user && otherUsers.length && user.post == Role.Admin) {
      let randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];

      await this.messageModel.deleteMany({ authorId: id });
      await this.userModel.findOneAndUpdate({ login: randomUser.login }, { post: Role.Admin }, { new: true });

      return await this.userModel.findByIdAndRemove({ _id: id });
    } else if (user) {
      await this.messageModel.deleteMany({ authorId: id });

      return await this.userModel.findByIdAndRemove({ _id: id });
    } else {
      return null;
    }
  }

  public static serializeUser(user: User): SecurityUser {
    return {
      _id: user._id,
      login: user.login,
      post: user.post,
      banned: user.banned
    }
  }

  public static sameLogin(users: SecurityUser[], login: string): boolean {
    let result = false;

    users.map(user => {
      if (user.login == login) {
        result = true;
      }
    });

    return result;
  }
}