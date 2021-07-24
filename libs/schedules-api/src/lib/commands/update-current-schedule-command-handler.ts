import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GameScheduleEntity } from '../entities';
import { convertStreamToGameSchedule } from '../conversions/convert-stream-to-game-schedule';
import { GameScheduleRepository } from '../repositories';
import { Readable } from 'stream';
import { GameScheduleModel } from '@soccer-utilities/models';

export class UpdateCurrentScheduleCommand {
  constructor(public readonly stream: Readable) {}
}

@CommandHandler(UpdateCurrentScheduleCommand)
export class UpdateCurrentScheduleCommandHandler
  implements ICommandHandler<UpdateCurrentScheduleCommand>
{
  constructor(private readonly repository: GameScheduleRepository) {}

  async execute(command: UpdateCurrentScheduleCommand): Promise<string> {
    const model = await convertStreamToGameSchedule(command.stream);

    const existing = await this.repository.getCurrent();
    if (existing) {
      return await this.update(existing, model);
    }

    return await this.create(model);
  }

  async update(
    entity: GameScheduleEntity,
    model: GameScheduleModel
  ): Promise<string> {
    entity.updateFromModel(model);
    const updated = await this.repository.update(entity);
    return updated.id;
  }

  async create(model: GameScheduleModel): Promise<string> {
    const entity = GameScheduleEntity.fromModel(model);
    const created = await this.repository.create(entity);
    return created.id;
  }
}
