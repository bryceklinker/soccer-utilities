import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserTimesheetRepository } from '../repositories/user-timesheet-repository';
import { UserTimesheetModel } from '@soccer-utilities/models';

export class PayTimesheetCommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(PayTimesheetCommand)
export class PayTimesheetCommandHandler
  implements ICommandHandler<PayTimesheetCommand, UserTimesheetModel>
{
  constructor(private readonly repository: UserTimesheetRepository) {}

  async execute(command: PayTimesheetCommand): Promise<UserTimesheetModel> {
    const timesheet = await this.repository.getById(command.id);
    if (!timesheet) {
      throw new Error(`Could not find timesheet with id ${command.id}`);
    }

    timesheet.pay();
    return await this.repository.update(timesheet);
  }
}
