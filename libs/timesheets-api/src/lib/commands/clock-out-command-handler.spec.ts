import { CommandBus } from '@nestjs/cqrs';
import {
  TestingRepository,
  TestingRepositoryFactory,
} from '@soccer-utilities/data-access/testing';
import { UserTimesheetEntity } from '../entities/user-timesheet.entity';
import { parseISO } from 'date-fns';
import { setupTestingModule } from '../../testing';
import { RepositoryFactory } from '@soccer-utilities/data-access';
import { ClockOutCommand } from './clock-out-command-handler';

const CURRENT_TIME = '2021-09-23T12:23:12.345Z';

describe('ClockOutCommandHandler', () => {
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

  test('when user clocks out then timesheet is clocked out', async () => {
    const original = await addOpenTimesheet('bill');

    await commandBus.execute(new ClockOutCommand('bill'));

    const updated = await repository.getById(original.id);
    expect(updated.timeOut).toEqual(CURRENT_TIME);
  });

  test('when user is missing open timesheet then throws error', async () => {
    await expect(() =>
      commandBus.execute(new ClockOutCommand('bill'))
    ).rejects.toThrowError('bill');
  });

  async function addOpenTimesheet(username: string) {
    const timesheet = new UserTimesheetEntity(username, 12);
    timesheet.clockIn();
    return await repository.create(timesheet);
  }
});
