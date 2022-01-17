import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  List,
  ListResult,
  RefereeReimbursementCheckModel,
} from '@soccer-utilities/models';
import { GameScheduleRepository } from '../repositories';

export class GetRefereeReimbursementChecksQuery {}

@QueryHandler(GetRefereeReimbursementChecksQuery)
export class GetRefereeReimbursementChecksQueryHandler
  implements
    IQueryHandler<
      GetRefereeReimbursementChecksQuery,
      ListResult<RefereeReimbursementCheckModel>
    >
{
  constructor(private readonly repository: GameScheduleRepository) {}

  async execute(
    query: GetRefereeReimbursementChecksQuery
  ): Promise<ListResult<RefereeReimbursementCheckModel>> {
    const schedule = await this.repository.getCurrent();
    const checks = schedule ? schedule.getRefereeReimbursementChecks() : [];
    return List.fromArray(checks);
  }
}
