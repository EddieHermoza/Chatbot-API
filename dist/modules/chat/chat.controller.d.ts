import { ChatService } from './chat.service';
import { StackAIService } from '../stack-ai/stack-ai.service';
export declare class ChatController {
    private readonly chatService;
    private readonly stackAIService;
    constructor(chatService: ChatService, stackAIService: StackAIService);
}
