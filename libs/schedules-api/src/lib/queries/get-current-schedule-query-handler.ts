import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GameScheduleModel } from '@soccer-utilities/core';
import { RepositoryFactory } from '@soccer-utilities/data-access';
import { GameScheduleEntity } from '../entities';

export class GetCurrentScheduleQuery {

}

@QueryHandler(GetCurrentScheduleQuery)
export class GetCurrentScheduleQueryHandler implements IQueryHandler<GetCurrentScheduleQuery, GameScheduleModel> {
  constructor(private readonly repositoryFactory: RepositoryFactory) {

  }

  async execute(query: GetCurrentScheduleQuery): Promise<GameScheduleModel> {
    const repository = this.repositoryFactory.create(GameScheduleEntity);
    const schedules = await repository.getAll();

    return GameScheduleEntity.fromEntity(schedules[0]).toModel();
  }
}
