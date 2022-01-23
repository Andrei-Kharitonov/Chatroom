import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class SecurityUser {
  @Prop()
  readonly _id: string;

  @Prop({ unique: true })
  login: string;

  @Prop({ default: 'user' })
  post: string;

  @Prop({ default: false })
  banned: boolean;
}