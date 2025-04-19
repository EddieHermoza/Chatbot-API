import { StackAIService } from './stack-ai.service';
import { AnalyticsQueryParams } from './query-params/analytics-query-params';
import { UploadWebsitesDto } from './dto/upload-websites.dto';
export declare class StackAIController {
    private readonly Stack;
    constructor(Stack: StackAIService);
    getDocuments(): Promise<any>;
    uploadDocument(file?: Express.Multer.File): Promise<any>;
    getWebsites(): Promise<any>;
    uploadWebsites(urls: UploadWebsitesDto): Promise<any>;
    getAnalytics(query: AnalyticsQueryParams): Promise<any>;
}
