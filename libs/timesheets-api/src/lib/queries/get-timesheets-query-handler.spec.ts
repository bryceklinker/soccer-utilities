import { setupTestingModule } from '../../testing';
import { RepositoryFactory } from '@soccer-utilities/data-access';
import {
  TestingRepository,
  TestingRepositoryFactory,
} from '@soccer-utilities/data-access/testing';
import { UserTimesheetEntity } from '../entities/user-timesheet.entity';
import { QueryBus } from '@nestjs/cqrs';
import { GetTimesheetsQuery } from './get-timesheets-query-handler';
import {
  ListResult,
  TimesheetStatus,
  UserTimesheetModel,
} from '@soccer-utilities/models';

describe('GetTimesheetsQueryHandler', () => {
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

  test('when getting all timesheets then returns all timesheets', async () => {
    await repository.create(new UserTimesheetEntity('three', 4));
    await repository.create(new UserTimesheetEntity('three', 4));
    await repository.create(new UserTimesheetEntity('three', 4));

    const result = await queryBus.execute<
      GetTimesheetsQuery,
      ListResult<UserTimesheetModel>
    >(new GetTimesheetsQuery());
    expect(result.count).toEqual(3);
    expect(result.items).toHaveLength(3);
  });

  test('when query includes a status then returns all timesheets with status', async () => {
    await queryBus.execute(
      new GetTimesheetsQuery({ status: TimesheetStatus.Complete })
    );

    const queries = repository.getExecutedQueries();
    expect(queries).toHaveLength(1);
    expect(queries[0]).toHaveQueryParameter({
      name: 'status',
      value: TimesheetStatus.Complete,
    });
  });

  test('when query includes username then returns all timesheets for user', async () => {
    await queryBus.execute(new GetTimesheetsQuery({ username: 'bill' }));

    const queries = repository.getExecutedQueries();
    expect(queries[0]).toHaveQueryParameter({
      name: 'username',
      value: 'bill',
    });
  });
});
