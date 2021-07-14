import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { DateRange, ListResult, RefereeCheckModel } from '@soccer-utilities/core';
import { GetRefereeChecksQuery } from '@soccer-utilities/schedules-api';

@Controller('referees')
export class RefereesController {
  constructor(private readonly queryBus: QueryBus) {
  }

  @Get('checks')
  async getChecks(@Query('start') start?: string, @Query('end') end?: string): Promise<ListResult<RefereeCheckModel>> {
    const range: DateRange | undefined = start && end ? {start, end} : undefined;
    return await this.queryBus.execute(new GetRefereeChecksQuery(range));
  }
}
