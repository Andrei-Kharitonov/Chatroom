import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://andr:Qwerty13DB@messages.cfjcz.mongodb.net/messages?retryWrites=true&w=majority'),
    UserModule,
    MessageModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
