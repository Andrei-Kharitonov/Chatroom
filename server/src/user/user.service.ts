import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { SecurityUser } from "./schemas/security-user.schemas";
import { User, UserDocument } from "./schemas/user.schemas";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async getAll(): Promise<SecurityUser[] | null> {
    let allUsers: Promise<User[] | null> = this.userModel.find().exec();

    if (allUsers) {
      return (await allUsers).map(user => {
        return {
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
    } else return null;
  }

  async create(userDto: CreateUserDto): Promise<User | null> {
    let newUser = new this.userModel(userDto);
    let users = await this.getAll();

    if (!users.length) {
      newUser.post = 'admin';
      return newUser.save();
    } else if (sameLogin(users, newUser.login)) {
      return null;
    } else {
      newUser.post = 'user';
      return newUser.save();
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