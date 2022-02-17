import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { NODE_ENV } from 'src/shared/env';
import { AppController } from './app.controller';
import { StaticFilesModule } from './static-files/static-files.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [RenderModule.forRootAsync(
    Next({ dev: NODE_ENV == 'development' }),
    { viewsDir: null }
  ),
  MongooseModule.forRoot(process.env.MONGODB_USERS_URI || 'mongodb+srv://andrei:Chat13DB@chatroom.cfjcz.mongodb.net/users?retryWrites=true&w=majority', {
    connectionName: 'users'
  }),
  MongooseModule.forRoot(process.env.MONGODB_MESSAGES_URI || 'mongodb+srv://andrei:Chat13DB@chatroom.cfjcz.mongodb.net/messages?retryWrites=true&w=majority', {
    connectionName: 'messages'
  }),
  MulterModule.register({
    dest: './files',
  }),
    StaticFilesModule,
    UserModule,
    MessageModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
