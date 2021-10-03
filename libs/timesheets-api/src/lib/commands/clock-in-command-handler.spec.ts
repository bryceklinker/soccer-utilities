import { CommandBus } from '@nestjs/cqrs';
import {
  TestingRepository,
  TestingRepositoryFactory,
} from '@soccer-utilities/data-access/testing';
import { UserTimesheetEntity } from '../entities/user-timesheet.entity';
import { setupTestingModule } from '../../testing';
import { RepositoryFactory } from '@soccer-utilities/data-access';
import { ClockInCommand } from './clock-in-command-handler';
import { parseISO } from 'date-fns';
import { TimesheetStatus } from '@soccer-utilities/models';

const CURRENT_TIME = '2021-09-23T12:23:12.345Z';

describe('ClockInCommandHandler', () => {
  let commandBus: CommandBus;
  let repository: TestingRepository<UserTimesheetEntity>;

  beforeEach(async () => {
    jest.useFakeTimers('modern').setSystemTime(parseISO(CURRENT_TIME));
    const app = await setupTestingModule();

    const repositoryFactory = app.get(
      RepositoryFactory
    ) as TestingRepositoryFactory;
    repository = repositoryFactory.setupRepository(UserTimesheetEntity);
    commandBus = app.get(CommandBus);
  });

  test('when user clocks in then returns added timesheet', async () => {
    const addedTimesheet = await commandBus.execute(
      new ClockInCommand('this-user-name', 14)
    );

    const timesheets = await repository.getAll();
    expect(timesheets).toContainEqual(addedTimesheet);
  });

  test('when user clocks in then saves user clocked in', async () => {
    await commandBus.execute(new ClockInCommand('this-user-name', 14));

    const timesheets = await repository.getAll();
    expect(timesheets).toHaveLength(1);
    expect(timesheets[0].username).toEqual('this-user-name');
    expect(timesheets[0].rate).toEqual(14);
  });

  test('when user clocks in with open timesheet then throws error', async () => {
    const openTimesheet = new UserTimesheetEntity('bob', 12);
    openTimesheet.clockIn();
    await repository.create(openTimesheet);

    await expect(() =>
      commandBus.execute(new ClockInCommand('bob', 14))
    ).rejects.toThrowError();
    const queries = repository.getExecutedQueries();
    expect(queries).toHaveLength(1);
    expect(queries[0]).toHaveQueryParameter({
      name: 'status',
      value: TimesheetStatus.Open,
    });
    expect(queries[0]).toHaveQueryParameter({ name: 'username', value: 'bob' });
  });
});
