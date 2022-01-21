import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class SecurityUser {
  @Prop()
  id: string;

  @Prop()
  login: string;

  @Prop({ default: 'user' })
  post: string;

  @Prop({ default: false })
  banned: boolean;
}