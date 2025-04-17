import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { RequestChatDto } from './dto/request-chat.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { StackAIService } from '../stack-ai/stack-ai.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly supabaseService: SupabaseService,
    private readonly stackAIService: StackAIService,
  ) {}

  @Post('/query')
  sendQuery(@Body() requestChatDto: RequestChatDto) {
    const { userId, message } = requestChatDto;
    return this.chatService.doQuery({
      userId: userId,
      query: message,
    });
  }

  @Post('/send')
  async sendMessage(@Body() body: { userId: string; message: string }) {
    const { userId, message } = body;

    const channel = this.supabaseService.getClient().channel(`chat:${userId}`, {
      config: {
        broadcast: { self: true },
      },
    });
    console.log(channel);
    console.log({ userId, message });
    await channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log(`📡 Subscrito a chat:${userId}`);
      } else {
        console.log(`📡 No se pudo subscribir a chat:${userId}`);
      }
    });

    this.stackAIService.streamQuery({ userId, 'in-0': message }).subscribe({
      next: async (chunk) => {
        await channel.send({
          type: 'broadcast',
          event: 'chatStreamChunk',
          payload: { chunk },
        });
      },
      complete: async () => {
        await channel.send({
          type: 'broadcast',
          event: 'chatStreamEnd',
          payload: {},
        });
      },
      error: async (err) => {
        console.error('❌ Error en stream:', err);
        await channel.send({
          type: 'broadcast',
          event: 'chatStreamError',
          payload: { error: err.message },
        });
      },
    });

    return { status: 'ok' };
  }
}
