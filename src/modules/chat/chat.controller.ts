import { Controller, Post, Body, Sse } from '@nestjs/common';
import { ChatService } from './chat.service';
import { RequestChatDto } from './dto/request-chat.dto';
import { Observable } from 'rxjs';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/query')
  sendQuery(@Body() requestChatDto: RequestChatDto) {
    const { userId, message } = requestChatDto;
    return this.chatService.doQuery({
      userId: userId,
      query: message,
    });
  }

  @Post('/stream-query')
  @Sse()
  sendStreamQuery(@Body() requestChatDto: RequestChatDto): Observable<any> {
    const { userId, message } = requestChatDto;
    return this.chatService.doSreamQuery({
      userId: userId,
      query: message,
    });
  }
}
