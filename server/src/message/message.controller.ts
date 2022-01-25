import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';
import { Message } from './schemas/message.schemas';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Get('/get-all')
  getAll(): Promise<Message[] | []> {
    return this.messageService.getAll();
  }

  @Post('/create')
  createMessage(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageService.create(createMessageDto);
  }

  @Delete('/delete/:id')
  removeMessage(@Param('id') id: string, @Query() user: Record<string, any>): Promise<Message> {
    return this.messageService.remove(id, user.login, user.password);
  }
}