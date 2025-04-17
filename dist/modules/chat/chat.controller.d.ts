import { ChatService } from './chat.service';
import { RequestChatDto } from './dto/request-chat.dto';
import { Observable } from 'rxjs';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    sendQuery(requestChatDto: RequestChatDto): Promise<any>;
    sendStreamQuery(requestChatDto: RequestChatDto): Observable<any>;
}
