import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { RequestChatDto } from './dto/request-chat.dto';
export declare class ChatGateway {
    private readonly chatService;
    server: Server;
    constructor(chatService: ChatService);
    handleStreamRequest(data: RequestChatDto, client: Socket): void;
}
