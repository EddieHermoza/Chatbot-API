import { BadRequestException } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { isValid, parse } from 'date-fns';
import { PaginatedQueryParams } from 'src/common/query-params/paginated-query-params';

export class AnalyticsQueryParams extends PaginatedQueryParams {
  @ApiPropertyOptional({
    description: 'Rango inicial de fechas',
    format: 'yyyy-MM-dd',
    type: 'string',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return null;
    if (value instanceof Date) return value;
    const date = parse(value, 'yyyy-MM-dd', new Date());

    if (!isValid(date)) {
      throw new BadRequestException(
        `El parámetro start_date no es una fecha válida. Usa el formato yyyy-MM-dd.`,
      );
    }

    return date;
  })
  start_date?: string;

  @ApiPropertyOptional({
    description: 'Rango Final de fechas',
    format: 'yyyy-MM-dd',
    type: 'string',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return null;
    if (value instanceof Date) return value;
    const date = parse(value, 'yyyy-MM-dd', new Date());

    if (!isValid(date)) {
      throw new BadRequestException(
        `El parámetro start_date no es una fecha válida. Usa el formato yyyy-MM-dd.`,
      );
    }

    return date;
  })
  end_date?: string;
}
