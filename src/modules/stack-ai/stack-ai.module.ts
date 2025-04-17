import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StackAIService } from './stack-ai.service';
import { StackAIController } from './stack-ai.controller';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  imports: [HttpModule],
  providers: [StackAIService, SupabaseService],
  controllers: [StackAIController],
  exports: [StackAIService],
})
export class StackAIModule {}
