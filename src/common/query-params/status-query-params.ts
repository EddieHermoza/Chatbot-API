import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';
import { PaginatedQueryParams } from './paginated-query-params';
import { Transform } from 'class-transformer';

enum StatusEnum {
  en = 'en',
  dis = 'dis',
  all = 'all',
}

export class StatusQueryParams extends PaginatedQueryParams {
  @ApiProperty({
    description: 'Estado',
    enum: StatusEnum,
    example: 'all',
    default: 'all',
  })
  @IsOptional()
  @IsBoolean({
    message: 'el status debe ser uno de los siguientes valores = en, dis, all',
  })
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return null;
    }

    if (value === 'en') return true;
    if (value === 'dis') return false;
    if (value === 'all') return null;

    return value;
  })
  status?: boolean | null = null;
}
