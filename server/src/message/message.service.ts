import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../user/schemas/user.schemas";
import { v4 as uuidv4 } from 'uuid';
import { CreateMessageDto } from "./dto/create-message.dto";
import { Message, MessageDocument } from "./schemas/message.schemas";

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
}