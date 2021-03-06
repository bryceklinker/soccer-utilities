import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GameScheduleModel } from '@soccer-utilities/models';
import { GameScheduleRepository } from '../repositories';

export class GetCurrentScheduleQuery {}

@QueryHandler(GetCurrentScheduleQuery)
export class GetCurrentScheduleQueryHandler
  implements IQueryHandler<GetCurrentScheduleQuery, GameScheduleModel | null>
{
  constructor(private readonly repository: GameScheduleRepository) {}

  async execute(): Promise<GameScheduleModel | null> {
    const schedule = await this.repository.getCurrent();
    return schedule ? schedule.toModel() : null;
  }
}
