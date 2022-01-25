import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../user/schemas/user.schemas";
import { v4 as uuidv4 } from 'uuid';
import { CreateMessageDto } from "./dto/create-message.dto";
import { Message, MessageDocument } from "./schemas/message.schemas";
import { Role } from "../user/roles/role.enum";

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  async getAll(): Promise<Message[] | any[]> {
    return await this.messageModel.find().exec();
  }

  async create(messageDto: CreateMessageDto): Promise<Message | null> {
    let author = await this.userModel.findById({ _id: messageDto.authorId });

    if (!author.banned) {
      let newMessage = new this.messageModel(messageDto);
      newMessage._id = uuidv4();
      newMessage.date = Date.now();
      return newMessage.save();
    } else {
      return null;
    }
  }

  async remove(messageId: string, login: string, password: string): Promise<Message | null> {
    let user = await this.userModel.findOne({ login });

    if (user && user.password == password && (user.post == (Role.Admin || Role.Moderator) || (user.login == login && user.password == password))) {
      return await this.messageModel.findByIdAndRemove({ _id: messageId });
    } else {
      return null;
    }
  }
}