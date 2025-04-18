import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { StackAIModule } from '../stack-ai/stack-ai.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [StackAIModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
