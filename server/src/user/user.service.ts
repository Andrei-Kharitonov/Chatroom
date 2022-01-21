import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Role } from "./roles/role.enum";
import { SecurityUser } from "./schemas/security-user.schemas";
import { User, UserDocument } from "./schemas/user.schemas";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async getAll(): Promise<SecurityUser[] | null> {
    let allUsers = this.userModel.find().exec();

    if (allUsers) {
      return (await allUsers).map(user => {
        return {
          id: user._id,
          login: user.login,
          post: user.post,
          banned: user.banned
        }
      });
    } else {
      return null;
    }
  }

  async getByLogin(login: string, password: string): Promise<User | null> {
    let user = await this.userModel.findOne({ login });
    if (user && user.password == password) {
      return user;
    } else {
      return null;
    }
  }

  async create(userDto: CreateUserDto): Promise<User | null> {
    let newUser = new this.userModel(userDto);
    let users = await this.getAll();

    if (!users.length) {
      newUser.post = Role.Admin;
      return newUser.save();
    } else if (sameLogin(users, newUser.login)) {
      return null;
    } else {
      newUser.post = Role.User;
      return newUser.save();
    }
  }

  async update(login: string, password: string, userDto: UpdateUserDto): Promise<User | null> {
    let user = await this.getByLogin(login, password);
    let otherUsers = (await this.getAll()).filter(user => user.login !== login);

    if (user && !sameLogin(otherUsers, userDto.login)) {
      return await this.userModel.findOneAndUpdate({ login }, userDto, { upsert: true, new: true });
    } else {
      return null;
    }
  }

  async remove(id: string, login: string, password: string): Promise<User | null> {
    let user = await this.getByLogin(login, password);

    if (user && user.post == Role.Admin) {
      return await this.userModel.findByIdAndRemove({ _id: id });
    } else {
      return null
    }
  }
}

function sameLogin(users: SecurityUser[], login: string): boolean {
  let result = false;

  users.map(user => {
    if (user.login == login) {
      result = true;
    }
  });

  return result;
}