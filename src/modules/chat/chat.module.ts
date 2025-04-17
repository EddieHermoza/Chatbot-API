import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { StackAIModule } from '../stack-ai/stack-ai.module';
import { ChatGateway } from './chat.gateway';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  imports: [StackAIModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, SupabaseService],
})
export class ChatModule {}
