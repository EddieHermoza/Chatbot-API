import { HttpService } from '@nestjs/axios';
import { IQueryStackAi } from './interfaces/query-stack-ai.interface';
import { Observable } from 'rxjs';
import { AnalyticsQueryParams } from './query-params/analytics-query-params';
import { UploadWebsitesDto } from './dto/upload-websites.dto';
import { SupabaseService } from '../supabase/supabase.service';
export declare class StackAIService {
    private readonly httpService;
    private readonly supabase;
    constructor(httpService: HttpService, supabase: SupabaseService);
    streamQuery(data: IQueryStackAi): Observable<any>;
    query(data: IQueryStackAi): Promise<any>;
    getDocuments(): Promise<any>;
    uploadDocument(files: Express.Multer.File[]): Promise<any>;
    getWebsites(): Promise<any>;
    uploadWebsites(data: UploadWebsitesDto): Promise<any>;
    getAnalytics(query: AnalyticsQueryParams): Promise<any>;
}
