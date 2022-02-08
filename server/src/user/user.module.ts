import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schemas';
import { Message, MessageSchema } from 'src/message/schemas/message.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'users'),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }], 'messages')
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }