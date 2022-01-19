import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://andrei:Chat13DB@chatroom.cfjcz.mongodb.net/users?retryWrites=true&w=majority', {
      connectionName: 'users'
    }),
    MongooseModule.forRoot('mongodb+srv://andrei:Chat13DB@chatroom.cfjcz.mongodb.net/messages?retryWrites=true&w=majority', {
      connectionName: 'messages'
    }),
    UserModule,
    MessageModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
