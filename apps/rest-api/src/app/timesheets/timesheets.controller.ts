import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiListResponse } from '../swagger/api-list-response';
import { UserTimesheetDto } from '@soccer-utilities/timesheets-api';
import {
  ClockInCommand,
  ClockOutCommand,
  GetTimesheetsQuery,
  PayTimesheetCommand,
} from '@soccer-utilities/timesheets-api';
import { TimesheetStatus, UserModel } from '@soccer-utilities/models';
import { CurrentUser } from '@soccer-utilities/nest-auth0';
import { RequiredRoles, Role, RolesGuard } from '@soccer-utilities/nest-auth0';

@Controller('timesheets')
@ApiTags('Timesheets')
@RequiredRoles(Role.admin)
@UseGuards(RolesGuard)
export class TimesheetsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Get('')
  @ApiQuery({
    name: 'status',
    required: false,
    enum: TimesheetStatus,
  })
  @ApiQuery({
    name: 'username',
    required: false,
    type: String,
  })
  @ApiListResponse(UserTimesheetDto)
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async getTimesheets(
    @Query('status') status?: TimesheetStatus,
    @Query('username') username?: string
  ) {
    const query = new GetTimesheetsQuery({ status, username });
    return await this.queryBus.execute(query);
  }

  @Post('clock-in')
  @ApiCreatedResponse({ type: String, description: 'id of current schedule' })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @RequiredRoles(Role.concessions)
  async clockIn(@CurrentUser() user: UserModel) {
    const command = new ClockInCommand(
      user.username,
      user?.user_metadata?.rate
    );
    return await this.commandBus.execute(command);
  }

  @Post('clock-out')
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @RequiredRoles(Role.concessions)
  async clockOut(@CurrentUser() user: UserModel) {
    const command = new ClockOutCommand(user.username);
    await this.commandBus.execute(command);
  }

  @Post(':id/pay')
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async pay(@Param('id') id: string) {
    const command = new PayTimesheetCommand(id);
    await this.commandBus.execute(command);
  }
}
