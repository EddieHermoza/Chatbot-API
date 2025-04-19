import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StackAIService } from './stack-ai.service';
import { StackAIController } from './stack-ai.controller';
import { SupabaseService } from '../supabase/supabase.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [HttpModule, MulterModule.register()],
  providers: [StackAIService, SupabaseService],
  controllers: [StackAIController],
  exports: [StackAIService],
})
export class StackAIModule {}
