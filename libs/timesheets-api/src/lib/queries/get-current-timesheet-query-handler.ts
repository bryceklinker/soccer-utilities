import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserTimesheetEntity } from '../entities';
import { UserTimesheetRepository } from '../repositories/user-timesheet-repository';

export class GetCurrentTimesheetQuery {
  constructor(
    public readonly username: string,
    public readonly rate?: number
  ) {}
}

@QueryHandler(GetCurrentTimesheetQuery)
export class GetCurrentTimesheetQueryHandler
  implements IQueryHandler<GetCurrentTimesheetQuery, UserTimesheetEntity>
{
  constructor(private readonly repository: UserTimesheetRepository) {}
  async execute(query: GetCurrentTimesheetQuery): Promise<UserTimesheetEntity> {
    const timesheet = await this.repository.getOpenTimesheet(query.username);
    if (timesheet) {
      return timesheet;
    }

    return new UserTimesheetEntity(query.username, query.rate);
  }
}
