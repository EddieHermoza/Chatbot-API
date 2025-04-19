import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SupabaseService } from '../supabase/supabase.service';
import { StackAIService } from '../stack-ai/stack-ai.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly supabaseService: SupabaseService,
    private readonly stackAIService: StackAIService,
  ) {}
}
