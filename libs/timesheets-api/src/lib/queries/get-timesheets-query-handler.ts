import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  UserTimesheetModel,
  ListResult,
  List,
  TimesheetStatus,
} from '@soccer-utilities/models';
import { QueryBuilder } from '@soccer-utilities/data-access';
import { UserTimesheetRepository } from '../repositories/user-timesheet-repository';
import { UserTimesheetEntity } from '../entities/user-timesheet.entity';

export class GetTimesheetsQuery {
  get status(): TimesheetStatus | undefined {
    return this.options.status;
  }

  get username(): string | undefined {
    return this.options.username;
  }

  constructor(
    private readonly options: Partial<{
      status: TimesheetStatus;
      username: string;
    }> = {}
  ) {}
}

@QueryHandler(GetTimesheetsQuery)
export class GetTimesheetsQueryHandler
  implements IQueryHandler<GetTimesheetsQuery, ListResult<UserTimesheetModel>>
{
  constructor(private readonly repository: UserTimesheetRepository) {}

  async execute(
    query: GetTimesheetsQuery
  ): Promise<ListResult<UserTimesheetModel>> {
    const builder = new QueryBuilder(UserTimesheetEntity);
    if (query.status) {
      builder.whereEqual('status', query.status);
    }

    if (query.username) {
      builder.whereEqual('username', query.username);
    }

    const timesheets = await this.repository.query(builder.build());
    return List.fromArray(timesheets);
  }
}
