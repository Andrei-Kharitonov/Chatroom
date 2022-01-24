import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop()
  readonly _id: string;

  @Prop({ unique: true })
  login: string;

  @Prop()
  password: string;

  @Prop({ default: 'user' })
  post: string;

  @Prop({ default: false })
  banned: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);