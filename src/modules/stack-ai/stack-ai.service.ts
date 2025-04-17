import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IQueryStackAi } from './interfaces/query-stack-ai.interface';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { STACK_AI_BASE_URL } from './constants/stack-ai-base-url';
import { FLOW_ID_REFERENCE } from './constants/flow-id-reference';
import { ORGANIZATION_ID_REFERENCE } from './constants/organization-id-reference';
import {
  STACK_PRIVATE_API_KEY,
  STACK_PUBLIC_API_KEY,
} from './constants/api-keys';
import { AnalyticsQueryParams } from './query-params/analytics-query-params';
import * as FormData from 'form-data';
import { UploadWebsitesDto } from './dto/upload-websites.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class StackAIService {
  constructor(
    private readonly httpService: HttpService,
    private readonly supabase: SupabaseService,
  ) {}

  streamQuery(data: IQueryStackAi): Observable<any> {
    const url = `${STACK_AI_BASE_URL}/inference/v0/stream/${ORGANIZATION_ID_REFERENCE}/${FLOW_ID_REFERENCE}`;

    return new Observable((observer) => {
      this.httpService
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${STACK_PUBLIC_API_KEY}`,
            'Content-Type': 'application/json',
          },
          responseType: 'stream',
        })
        .subscribe({
          next: async (response) => {
            const stream = response.data;
            stream.setEncoding('utf8');

            let buffer = '';

            stream.on('data', (chunk: string) => {
              buffer += chunk;

              const lines = buffer.split('\n');
              buffer = lines.pop() || '';

              for (const line of lines) {
                try {
                  if (line.trim() === '') continue;
                  const parsed = JSON.parse(line);
                  const output = parsed.outputs?.['out-0'];
                  if (output) {
                    // Emitir el fragmento al canal de Supabase

                    observer.next(output);
                  }
                } catch (err) {
                  console.warn('Línea no parseable:', err);
                }
              }
            });

            stream.on('end', () => {
              // Emitir evento de finalización

              observer.complete();
            });

            stream.on('error', (err) => {
              // Emitir evento de error

              observer.error(err);
            });
          },
          error: (err) => {
            observer.error(err);
          },
        });
    });
  }

  async query(data: IQueryStackAi) {
    const url = `${STACK_AI_BASE_URL}/inference/v0/run/${ORGANIZATION_ID_REFERENCE}/${FLOW_ID_REFERENCE}`;
    try {
      const response = await lastValueFrom(
        this.httpService.post(url, data, {
          headers: {
            Authorization: `Bearer ${STACK_PUBLIC_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }),
      );

      return response.data;
    } catch (error) {
      console.log(error);
      console.error('Error en la StackAI API:', error.message);
      throw new ServiceUnavailableException('Error en la StackAI API');
    }
  }

  async getDocuments() {
    const url = `${STACK_AI_BASE_URL}/indexing/v0/${FLOW_ID_REFERENCE}/${ORGANIZATION_ID_REFERENCE}/knowledgebase-1`;
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${STACK_PRIVATE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }),
      );

      return response.data;
    } catch (error) {
      console.error('Error en la STACK AI API:', error.message);
      throw new ServiceUnavailableException('Error en la STACK AI API');
    }
  }

  async uploadDocument(files: Express.Multer.File[]) {
    const url = `${STACK_AI_BASE_URL}/indexing/v0/documents/6535facc5607359530e08113/${ORGANIZATION_ID_REFERENCE}/knowledgebase-1`;
    try {
      const form = new FormData();

      for (const file of files) {
        form.append('files', file.buffer, file.originalname);
      }

      const response = await firstValueFrom(
        this.httpService.post(url, form, {
          headers: {
            Authorization: `Bearer ${STACK_PRIVATE_API_KEY}`,
            ...form.getHeaders(),
          },
        }),
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error en la STACK AI API:',
        error?.response?.data || error.message,
      );
      throw new ServiceUnavailableException('Error en la STACK AI API');
    }
  }

  async getWebsites() {
    const url = `${STACK_AI_BASE_URL}/indexing/v0/${FLOW_ID_REFERENCE}/${ORGANIZATION_ID_REFERENCE}/urlemb-0`;
    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${STACK_PRIVATE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }),
      );

      return response.data;
    } catch (error) {
      console.error('Error en la STACK AI API:', error.message);
      throw new ServiceUnavailableException('Error en la STACK AI API');
    }
  }

  async uploadWebsites(data: UploadWebsitesDto) {
    const url = `${STACK_AI_BASE_URL}/indexing/v0/urls/${FLOW_ID_REFERENCE}/${ORGANIZATION_ID_REFERENCE}/urlemb-0`;
    try {
      const response = await lastValueFrom(
        this.httpService.post(url, data.urls, {
          headers: {
            Authorization: `Bearer ${STACK_PRIVATE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }),
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error en la STACK AI API:',
        error?.response?.data || error.message,
      );
      throw new ServiceUnavailableException('Error en la STACK AI API');
    }
  }

  async getAnalytics(query: AnalyticsQueryParams) {
    const url = `${STACK_AI_BASE_URL}/analytics/org/${ORGANIZATION_ID_REFERENCE}/flows/${FLOW_ID_REFERENCE}`;
    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${STACK_PRIVATE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          params: query,
        }),
      );

      return response.data;
    } catch (error) {
      console.log(error);
      console.error(
        'Error en la STACK AI API:',
        error?.response?.data || error.message,
      );
      throw new ServiceUnavailableException('Error en la STACK AI API');
    }
  }
}
