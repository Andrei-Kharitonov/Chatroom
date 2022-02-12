import { Prop, Schema } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class SecurityUser {
  @Prop()
  readonly _id: string;

  @Prop({ unique: true })
  login: string;

  @Prop({ default: '' })
  avatarPath: string;

  @Prop({ default: 'user' })
  post: string;

  @Prop({ default: false })
  banned: boolean;
}