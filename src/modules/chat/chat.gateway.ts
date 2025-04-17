import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { RequestChatDto } from './dto/request-chat.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('WebSocket')
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('chatStream')
  handleStreamRequest(
    @MessageBody() data: RequestChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { userId, message } = data;
    this.chatService
      .doSreamQuery({ userId: userId, query: message })
      .subscribe({
        next: (chunk) => {
          client.emit('chatStreamChunk', chunk);
        },
        complete: () => {
          client.emit('chatStreamEnd');
        },
        error: (err) => {
          client.emit('chatStreamError', err.message || 'Error desconocido');
        },
      });
  }
}
