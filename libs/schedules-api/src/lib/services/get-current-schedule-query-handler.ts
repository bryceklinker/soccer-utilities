import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GameScheduleModel } from '@soccer-utilities/core';

export class GetCurrentScheduleQuery {

}

@QueryHandler(GetCurrentScheduleQuery)
export class GetCurrentScheduleQueryHandler implements IQueryHandler<GetCurrentScheduleQuery> {
  execute(query: GetCurrentScheduleQuery): Promise<GameScheduleModel> {
    return Promise.resolve(undefined);
  }
}
