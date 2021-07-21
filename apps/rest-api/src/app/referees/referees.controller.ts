import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { DATE_FORMAT, DateRange, ListResult, RefereeCheckModel } from '@soccer-utilities/core';
import { GetRefereeChecksQuery } from '@soccer-utilities/schedules-api';
import {
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiOkResponse, ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath
} from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { ApiListResponse } from '../swagger/api-list-response';

@Controller('referees')
@ApiTags('Referees')
@ApiExtraModels(ListResult, RefereeCheckModel)
export class RefereesController {
  constructor(private readonly queryBus: QueryBus) {
  }

  @Get('checks')
  @ApiListResponse(RefereeCheckModel)
  @ApiImplicitQuery({
    name: 'start',
    required: false,
    type: String,
    example: DATE_FORMAT
  })
  @ApiImplicitQuery({
    name: 'end',
    required: false,
    type: String,
    example: DATE_FORMAT
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async getChecks(@Query('start') start?: string, @Query('end') end?: string): Promise<ListResult<RefereeCheckModel>> {
    const range: DateRange | undefined = start && end ? { start, end } : undefined;
    return await this.queryBus.execute(new GetRefereeChecksQuery(range));
  }
}
