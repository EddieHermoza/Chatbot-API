import { ChatService } from './chat.service';
import { RequestChatDto } from './dto/request-chat.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { StackAIService } from '../stack-ai/stack-ai.service';
import { ok } from 'assert';
export declare class ChatController {
    private readonly chatService;
    private readonly supabaseService;
    private readonly stackAIService;
    constructor(chatService: ChatService, supabaseService: SupabaseService, stackAIService: StackAIService);
    sendQuery(requestChatDto: RequestChatDto): Promise<any>;
    sendMessage(body: {
        userId: string;
        message: string;
    }): Promise<{
        status: typeof ok;
    }>;
}
