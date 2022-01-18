import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateMessageDto } from "./dto/create-message.dto";
import { Message, MessageDocument } from "./schemas/message.schemas";

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) { }

  async create(messageDto: CreateMessageDto): Promise<Message> {
    let newMessage = new this.messageModel(messageDto);
    return newMessage.save();
  }
}