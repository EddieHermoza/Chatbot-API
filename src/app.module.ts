import { Module } from '@nestjs/common';

import { ChatModule } from './modules/chat/chat.module';
import { StackAIModule } from './modules/stack-ai/stack-ai.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ChatModule,
    StackAIModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
