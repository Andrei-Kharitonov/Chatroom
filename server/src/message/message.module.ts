import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schemas';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message, MessageSchema } from './schemas/message.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }], 'messages'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'users')
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule { }