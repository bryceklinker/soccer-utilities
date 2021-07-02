import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReadStream } from 'fs';
import { Repository, RepositoryFactory } from '@soccer-utilities/data-access';
import { GameScheduleEntity } from '../entities';
import { convertStreamToGameSchedule } from '../conversions/convert-stream-to-game-schedule';
import { GameScheduleModel } from '@soccer-utilities/core';
import { GameScheduleRepository } from '../repositories';

export class UpdateCurrentScheduleCommand {
  constructor(public readonly stream: ReadStream) {
  }
}

@CommandHandler(UpdateCurrentScheduleCommand)
export class UpdateCurrentScheduleCommandHandler implements ICommandHandler<UpdateCurrentScheduleCommand> {

  constructor(private readonly repository: GameScheduleRepository) {
  }

  async execute(command: UpdateCurrentScheduleCommand): Promise<any> {
    const model = await convertStreamToGameSchedule(command.stream);

    const existing = await this.repository.getCurrent();
    if (existing) {
      return await this.update(existing, model);
    }

    return await this.create(model);
  }

  async update(entity: GameScheduleEntity, model: GameScheduleModel): Promise<string> {
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