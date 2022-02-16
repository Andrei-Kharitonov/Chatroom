import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "../roles/role.enum";

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop()
  readonly _id: string;

  @Prop({ unique: true })
  login: string;

  @Prop()
  password: string;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ default: 'user' })
  post: Role;

  @Prop({ default: false })
  banned: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);