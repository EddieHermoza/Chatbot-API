import { ApiProperty } from '@nestjs/swagger';
import { PaginatedQueryParams } from './paginated-query-params';
import { IsOptional, IsString } from 'class-validator';

export class SearchQueryParams extends PaginatedQueryParams {
  @ApiProperty({ description: 'Texto de búsqueda', example: '' })
  @IsOptional()
  @IsString()
  query?: string = '';
}
