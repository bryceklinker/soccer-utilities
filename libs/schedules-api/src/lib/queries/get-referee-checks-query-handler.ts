import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DateRange, DEFAULT_REFEREE_PAY_SCALES, List, RefereeCheckModel } from '@soccer-utilities/core';
import { GameScheduleRepository } from '../repositories';

export class GetRefereeChecksQuery {
  constructor(public readonly range?: DateRange) {
  }
}

@QueryHandler(GetRefereeChecksQuery)
export class GetRefereeChecksQueryHandler implements IQueryHandler<GetRefereeChecksQuery, List<RefereeCheckModel>> {
  constructor(private readonly repository: GameScheduleRepository) {
  }
  async execute(query: GetRefereeChecksQuery): Promise<List<RefereeCheckModel>> {
    const schedule = await this.repository.getCurrent();
    const checks = schedule ? schedule.getRefereeChecks(DEFAULT_REFEREE_PAY_SCALES, query.range) : [];
    return {
      items: checks
    }
  }
}
