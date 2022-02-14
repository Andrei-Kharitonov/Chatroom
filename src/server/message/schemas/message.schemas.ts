import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type MessageDocument = Message & Document;

@Schema({ versionKey: false })
export class Message {
  @Prop()
  readonly _id: string;

  @Prop()
  authorId: string;

  @Prop()
  text: string;

  @Prop()
  date: number;
}

export const MessageSchema = SchemaFactory.createForClass(Message);