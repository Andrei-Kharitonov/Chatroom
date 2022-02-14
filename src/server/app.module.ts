import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { NODE_ENV } from 'src/shared/env';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [RenderModule.forRootAsync(
    Next({ dev: NODE_ENV == 'development' }),
    { viewsDir: null }),
  MongooseModule.forRoot(process.env.MONGODB_USERS_URI || 'mongodb+srv://andrei:Chat13DB@chatroom.cfjcz.mongodb.net/users?retryWrites=true&w=majority', {
    connectionName: 'users'
  }),
  MongooseModule.forRoot(process.env.MONGODB_MESSAGES_URI || 'mongodb+srv://andrei:Chat13DB@chatroom.cfjcz.mongodb.net/messages?retryWrites=true&w=majority', {
    connectionName: 'messages'
  }),
  MulterModule.register({
    dest: './files',
  }),
    UserModule,
    MessageModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
