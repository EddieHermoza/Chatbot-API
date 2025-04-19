import { StackAIService } from '../stack-ai/stack-ai.service';
export declare class ChatService {
    private readonly aiService;
    constructor(aiService: StackAIService);
    doQuery({ userId, query }: {
        userId: any;
        query: any;
    }): Promise<any>;
    doSreamQuery({ userId, query }: {
        userId: any;
        query: any;
    }): import("rxjs").Observable<any>;
}
