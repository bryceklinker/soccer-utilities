import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserTimesheetRepository } from '../repositories/user-timesheet-repository';
import { UserTimesheetModel } from '@soccer-utilities/models';

export class ClockOutCommand {
  constructor(public readonly username: string) {}
}

@CommandHandler(ClockOutCommand)
export class ClockOutCommandHandler
  implements ICommandHandler<ClockOutCommand, UserTimesheetModel>
{
  constructor(private readonly repository: UserTimesheetRepository) {}

  async execute(command: ClockOutCommand): Promise<UserTimesheetModel> {
    const timesheet = await this.repository.getOpenTimesheet(command.username);
    if (!timesheet) {
      throw new Error(
        `Could not find open timesheet for user ${command.username}`
      );
    }

    timesheet.clockOut();
    return await this.repository.update(timesheet);
  }
}
