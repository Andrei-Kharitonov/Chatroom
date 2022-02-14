import { Prop, Schema } from "@nestjs/mongoose";
import { Role } from "../roles/role.enum";

@Schema({ versionKey: false })
export class SecurityUser {
  @Prop()
  readonly _id: string;

  @Prop({ unique: true })
  login: string;

  @Prop({ default: '' })
  avatarPath: string;

  @Prop({ default: 'user' })
  post: Role;

  @Prop({ default: false })
  banned: boolean;
}