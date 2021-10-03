import { QueryBus } from '@nestjs/cqrs';
import {
  TestingRepository,
  TestingRepositoryFactory,
} from '@soccer-utilities/data-access/testing';
import { UserTimesheetEntity } from '../entities';
import { RepositoryFactory } from '@soccer-utilities/data-access';
import { TimesheetStatus } from '@soccer-utilities/models';
import { setupTestingModule } from '../../testing';
import { GetCurrentTimesheetQuery } from './get-current-timesheet-query-handler';

describe('GetCurrentTimesheetQueryHandler', () => {
  let queryBus: QueryBus;
  let repository: TestingRepository<UserTimesheetEntity>;

  beforeEach(async () => {
    const app = await setupTestingModule();

    const repositoryFactory = app.get(
      RepositoryFactory
    ) as TestingRepositoryFactory;
    repository = repositoryFactory.setupRepository(UserTimesheetEntity);
    queryBus = app.get(QueryBus);
  });

  test('when user does not have open timesheet then returns default timesheet', async () => {
    const timesheet = await queryBus.execute<
      GetCurrentTimesheetQuery,
      UserTimesheetEntity
    >(new GetCurrentTimesheetQuery('bill', 45));

    expect(timesheet.status).toEqual(TimesheetStatus.New);
    expect(timesheet.username).toEqual('bill');
    expect(timesheet.rate).toEqual(45);
  });

  test('when user has open timesheet then returns timesheet', async () => {
    const existing = new UserTimesheetEntity('three', 4);
    existing.clockIn();
    await repository.create(existing);

    const actual = await queryBus.execute<
      GetCurrentTimesheetQuery,
      UserTimesheetEntity
    >(new GetCurrentTimesheetQuery('three'));

    expect(actual.username).toEqual('three');
    expect(actual.rate).toEqual(4);
    expect(actual.timeIn).toEqual(existing.timeIn);
    expect(actual.status).toEqual(existing.status);
  });
});
