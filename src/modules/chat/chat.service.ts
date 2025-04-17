import { Injectable } from '@nestjs/common';
import { StackAIService } from '../stack-ai/stack-ai.service';

@Injectable()
export class ChatService {
  constructor(private readonly aiService: StackAIService) {}

  doQuery({ userId, query }) {
    return this.aiService.query({
      userId,
      'in-0': query,
    });
  }

  doSreamQuery({ userId, query }) {
    return this.aiService.streamQuery({
      userId,
      'in-0': query,
    });
  }
}
