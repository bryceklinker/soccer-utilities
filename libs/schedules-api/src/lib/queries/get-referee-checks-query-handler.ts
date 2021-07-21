import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DateRangeModel, DEFAULT_REFEREE_PAY_SCALES, List, ListResult, RefereeCheckModel } from '@soccer-utilities/core';
import { GameScheduleRepository } from '../repositories';

export class GetRefereeChecksQuery {
  constructor(public readonly range?: DateRangeModel) {
  }
}

@QueryHandler(GetRefereeChecksQuery)
export class GetRefereeChecksQueryHandler implements IQueryHandler<GetRefereeChecksQuery, ListResult<RefereeCheckModel>> {
  constructor(private readonly repository: GameScheduleRepository) {
  }
  async execute(query: GetRefereeChecksQuery): Promise<ListResult<RefereeCheckModel>> {
    const schedule = await this.repository.getCurrent();
    const checks = schedule ? schedule.getRefereeChecks(DEFAULT_REFEREE_PAY_SCALES, query.range) : [];
    return List.fromArray(checks);
  }
}
