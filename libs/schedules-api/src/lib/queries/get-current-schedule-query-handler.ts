import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GameScheduleModel } from '@soccer-utilities/core';
import { GameScheduleRepository } from '../repositories';

export class GetCurrentScheduleQuery {

}

@QueryHandler(GetCurrentScheduleQuery)
export class GetCurrentScheduleQueryHandler implements IQueryHandler<GetCurrentScheduleQuery, GameScheduleModel> {
  constructor(private readonly repository: GameScheduleRepository) {

  }

  async execute(query: GetCurrentScheduleQuery): Promise<GameScheduleModel> {
    const schedule = await this.repository.getCurrent();
    return schedule.toModel();
  }
}
