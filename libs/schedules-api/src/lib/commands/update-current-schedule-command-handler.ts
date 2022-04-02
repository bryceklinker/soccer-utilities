import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GameScheduleEntity } from '../entities';
import { convertStreamToGameSchedule } from '../conversions/convert-stream-to-game-schedule';
import { GameScheduleRepository } from '../repositories';
import { Readable } from 'stream';
import { GameScheduleModel } from '@soccer-utilities/models';
import { Logger } from '@nestjs/common';

export class UpdateCurrentScheduleCommand {
  constructor(public readonly stream: Readable) {}
}

@CommandHandler(UpdateCurrentScheduleCommand)
export class UpdateCurrentScheduleCommandHandler
  implements ICommandHandler<UpdateCurrentScheduleCommand>
{
  constructor(
    private readonly repository: GameScheduleRepository,
    private readonly logger: Logger
  ) {}

  async execute(command: UpdateCurrentScheduleCommand): Promise<string> {
    const { schedule, failedRows } = await convertStreamToGameSchedule(
      command.stream
    );

    if (failedRows.length > 0) {
      this.logger.warn(
        'Failed to process {RowCount}',
        failedRows.length,
        failedRows
      );
    }

    const existing = await this.repository.getCurrent();
    if (existing) {
      return await this.update(existing, schedule);
    }

    return await this.create(schedule);
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
