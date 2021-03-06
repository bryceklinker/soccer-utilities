import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetRefereeChecksQuery,
  GetRefereeReimbursementChecksQuery,
  ListResultDto,
  RefereeCheckDto,
  RefereeReimbursementCheckDto,
} from '@soccer-utilities/schedules-api';
import {
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ApiListResponse } from '../swagger/api-list-response';
import {
  DATE_FORMAT,
  DateRangeModel,
  ListResult,
  RefereeCheckModel,
  RefereeReimbursementCheckModel,
  Role,
} from '@soccer-utilities/models';
import { RequiredRoles, RolesGuard } from '@soccer-utilities/nest-auth0';

@Controller('referees')
@ApiTags('Referees')
@ApiExtraModels(ListResultDto, RefereeCheckDto)
@RequiredRoles(Role.admin)
@UseGuards(RolesGuard)
export class RefereesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('checks')
  @ApiListResponse(RefereeCheckDto)
  @ApiQuery({
    name: 'start',
    required: false,
    type: String,
    example: DATE_FORMAT,
  })
  @ApiQuery({
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

  @Get('reimbursement-checks')
  @ApiListResponse(RefereeReimbursementCheckDto)
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async getReimbursementChecks(): Promise<
    ListResult<RefereeReimbursementCheckModel>
  > {
    return await this.queryBus.execute(
      new GetRefereeReimbursementChecksQuery()
    );
  }
}
