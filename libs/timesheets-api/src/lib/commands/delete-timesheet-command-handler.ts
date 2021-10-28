import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserTimesheetRepository } from '../repositories/user-timesheet-repository';

export class DeleteTimesheetCommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(DeleteTimesheetCommand)
export class DeleteTimesheetCommandHandler
  implements ICommandHandler<DeleteTimesheetCommand, void>
{
  constructor(private readonly repository: UserTimesheetRepository) {}

  async execute(command: DeleteTimesheetCommand): Promise<void> {
    const existing = await this.repository.getById(command.id);
    if (!existing) {
      throw new Error(`Could not find timesheet with id ${command.id}`);
    }
    await this.repository.delete(command.id);
  }
}
