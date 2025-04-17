import { HttpService } from '@nestjs/axios';
import { IQueryStackAi } from './interfaces/query-stack-ai.interface';
import { Observable } from 'rxjs';
import { AnalyticsQueryParams } from './query-params/analytics-query-params';
import { UploadWebsitesDto } from './dto/upload-websites.dto';
export declare class StackAIService {
    private readonly httpService;
    constructor(httpService: HttpService);
    query(data: IQueryStackAi): Promise<any>;
    getDocuments(): Promise<any>;
    uploadDocument(files: Express.Multer.File[]): Promise<any>;
    getWebsites(): Promise<any>;
    uploadWebsites(data: UploadWebsitesDto): Promise<any>;
    getAnalytics(query: AnalyticsQueryParams): Promise<any>;
    streamQuery(data: IQueryStackAi): Observable<any>;
}
