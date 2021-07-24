import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetRefereeChecksQuery,
  ListResultDto,
  RefereeCheckDto,
} from '@soccer-utilities/schedules-api';
import {
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { ApiListResponse } from '../swagger/api-list-response';
import {
  DATE_FORMAT,
  DateRangeModel,
  ListResult,
  RefereeCheckModel,
} from '@soccer-utilities/models';

@Controller('referees')
@ApiTags('Referees')
@ApiExtraModels(ListResultDto, RefereeCheckDto)
export class RefereesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('checks')
  @ApiListResponse(RefereeCheckDto)
  @ApiImplicitQuery({
    name: 'start',
    required: false,
    type: String,
    example: DATE_FORMAT,
  })
  @ApiImplicitQuery({
    name: 'end',
    required: false,
    type: String,
    example: DATE_FORMAT,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async getChecks(
    @Query('start') start?: string,
    @Query('end') end?: string
  ): Promise<ListResult<RefereeCheckModel>> {
    const range: DateRangeModel | undefined =
      start && end ? { start, end } : undefined;
    return await this.queryBus.execute(new GetRefereeChecksQuery(range));
  }
}
