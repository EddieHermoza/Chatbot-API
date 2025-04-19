import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AnalyticsQueryParams } from './query-params/analytics-query-params';
import { UploadWebsitesDto } from './dto/upload-websites.dto';
import { IQueryStackAi } from './interfaces/query-stack-ai.interface';
export declare class StackAIService {
    private readonly httpService;
    constructor(httpService: HttpService);
    streamQuery(data: IQueryStackAi): Observable<any>;
    query(data: IQueryStackAi): Promise<any>;
    getDocuments(): Promise<any>;
    uploadDocuments(files: Express.Multer.File[]): Promise<any>;
    uploadDocument(file: Express.Multer.File): Promise<any>;
    getWebsites(): Promise<any>;
    uploadWebsites(data: UploadWebsitesDto): Promise<any>;
    getAnalytics(query: AnalyticsQueryParams): Promise<any>;
}
