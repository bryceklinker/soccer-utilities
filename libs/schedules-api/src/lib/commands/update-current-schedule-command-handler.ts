import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReadStream } from 'fs';
import { RepositoryFactory } from '@soccer-utilities/data-access';
import { GameScheduleEntity } from '../entities';
import { convertStreamToGameSchedule } from '../conversions/convert-stream-to-game-schedule';

export class UpdateCurrentScheduleCommand {
  constructor(public readonly stream: ReadStream) {
  }
}

@CommandHandler(UpdateCurrentScheduleCommand)
export class UpdateCurrentScheduleCommandHandler implements ICommandHandler<UpdateCurrentScheduleCommand> {

  constructor(private readonly repositoryFactory: RepositoryFactory) {
  }

  async execute(command: UpdateCurrentScheduleCommand): Promise<any> {
    const repository = this.repositoryFactory.create(GameScheduleEntity);
    const model = await convertStreamToGameSchedule(command.stream);
    const entity = GameScheduleEntity.fromModel(model);
    const { id } = await repository.create(entity);
    return id;
  }

}
