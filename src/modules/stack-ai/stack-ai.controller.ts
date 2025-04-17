import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StackAIService } from './stack-ai.service';
import { AnalyticsQueryParams } from './query-params/analytics-query-params';
import { UseFilesInterceptor } from 'src/common/decorators/file-interceptor.decorator';
import { UploadFile } from 'src/common/decorators/upload-images.decorator';
import { UploadWebsitesDto } from './dto/upload-websites.dto';

@Controller('stack-ai')
export class StackAIController {
  constructor(private readonly Stack: StackAIService) {}

  @Get('/documents')
  getDocuments() {
    return this.Stack.getDocuments();
  }

  @UseFilesInterceptor()
  @Post('/upload-documents')
  uploadDocuments(@UploadFile() files?: Express.Multer.File[]) {
    return this.Stack.uploadDocument(files);
  }

  @Get('/websites')
  getWebsites() {
    return this.Stack.getWebsites();
  }

  @Post('/upload-websites')
  uploadWebsites(@Body() urls: UploadWebsitesDto) {
    return this.Stack.uploadWebsites(urls);
  }

  @Get('/Analytics')
  getAnalytics(@Query() query: AnalyticsQueryParams) {
    return this.Stack.getAnalytics(query);
  }
}
