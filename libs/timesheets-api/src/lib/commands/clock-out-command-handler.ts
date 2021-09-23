import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserTimesheetRepository } from '../repositories/user-timesheet-repository';

export class ClockOutCommand {
  constructor(public readonly username: string) {}
}

@CommandHandler(ClockOutCommand)
export class ClockOutCommandHandler
  implements ICommandHandler<ClockOutCommand>
{
  constructor(private readonly repository: UserTimesheetRepository) {}

  async execute(command: ClockOutCommand): Promise<void> {
    const timesheet = await this.repository.getOpenTimesheet(command.username);
    if (!timesheet) {
      throw new Error(
        `Could not find open timesheet for user ${command.username}`
      );
    }

    timesheet.clockOut();
    await this.repository.update(timesheet);
  }
}
