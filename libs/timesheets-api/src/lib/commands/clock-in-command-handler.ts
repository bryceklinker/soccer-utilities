import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserTimesheetRepository } from '../repositories/user-timesheet-repository';
import { UserTimesheetEntity } from '../entities/user-timesheet.entity';
import { UserTimesheetModel } from '@soccer-utilities/models';

export class ClockInCommand {
  constructor(
    public readonly username: string,
    public readonly rate?: number
  ) {}
}

@CommandHandler(ClockInCommand)
export class ClockInCommandHandler
  implements ICommandHandler<ClockInCommand, UserTimesheetModel>
{
  constructor(private readonly repository: UserTimesheetRepository) {}

  async execute(command: ClockInCommand): Promise<UserTimesheetModel> {
    const openTimesheet = await this.repository.getOpenTimesheet(
      command.username
    );
    if (openTimesheet) {
      throw new Error(`User ${command.username} already has an open timesheet`);
    }

    const entity = new UserTimesheetEntity(command.username, command.rate);
    entity.clockIn();
    return await this.repository.add(entity);
  }
}
