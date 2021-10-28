import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiQuery,
  ApiExtraModels,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiListResponse } from '../swagger/api-list-response';
import {
  DeleteTimesheetCommand,
  UserTimesheetDto,
} from '@soccer-utilities/timesheets-api';
import {
  ClockInCommand,
  ClockOutCommand,
  GetTimesheetsQuery,
  GetCurrentTimesheetQuery,
  PayTimesheetCommand,
} from '@soccer-utilities/timesheets-api';
import { Role, TimesheetStatus, UserModel } from '@soccer-utilities/models';
import { CurrentUser } from '@soccer-utilities/nest-auth0';
import { RequiredRoles, RolesGuard } from '@soccer-utilities/nest-auth0';
import { ListResultDto } from '@soccer-utilities/schedules-api';

@Controller('timesheets')
@ApiTags('Timesheets')
@ApiExtraModels(ListResultDto, UserTimesheetDto)
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

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async deleteTimesheet(@Param('id') id: string) {
    const command = new DeleteTimesheetCommand(id);
    return await this.commandBus.execute(command);
  }

  @Get('current')
  @ApiOkResponse({ type: UserTimesheetDto })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @RequiredRoles(Role.concessions)
  async getCurrentTimesheet(@CurrentUser() user: UserModel) {
    const query = new GetCurrentTimesheetQuery(
      user.username,
      user.user_metadata?.rate
    );
    return await this.queryBus.execute(query);
  }

  @Post('current/clock-in')
  @ApiCreatedResponse({
    type: UserTimesheetDto,
    description: 'Newly created timesheet',
  })
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

  @Post('current/clock-out')
  @ApiOkResponse({ type: UserTimesheetDto, description: 'Updated timesheet' })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @RequiredRoles(Role.concessions)
  async clockOut(@CurrentUser() user: UserModel) {
    const command = new ClockOutCommand(user.username);
    return await this.commandBus.execute(command);
  }

  @Post(':id/pay')
  @ApiOkResponse({ type: UserTimesheetDto, description: 'Updated timesheet' })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async pay(@Param('id') id: string) {
    const command = new PayTimesheetCommand(id);
    return await this.commandBus.execute(command);
  }
}
