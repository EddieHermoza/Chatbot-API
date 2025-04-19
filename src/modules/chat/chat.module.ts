import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { StackAIModule } from '../stack-ai/stack-ai.module';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  imports: [StackAIModule],
  controllers: [ChatController],
  providers: [ChatService, SupabaseService],
})
export class ChatModule {}
