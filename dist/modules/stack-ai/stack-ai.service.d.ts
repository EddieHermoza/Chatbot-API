import { HttpService } from '@nestjs/axios';
import { AnalyticsQueryParams } from './query-params/analytics-query-params';
import { UploadWebsitesDto } from './dto/upload-websites.dto';
import { SupabaseService } from '../supabase/supabase.service';
export declare class StackAIService {
    private readonly httpService;
    private readonly supabase;
    constructor(httpService: HttpService, supabase: SupabaseService);
    getDocuments(): Promise<any>;
    uploadDocuments(files: Express.Multer.File[]): Promise<any>;
    uploadDocument(file: Express.Multer.File): Promise<any>;
    getWebsites(): Promise<any>;
    uploadWebsites(data: UploadWebsitesDto): Promise<any>;
    getAnalytics(query: AnalyticsQueryParams): Promise<any>;
}
