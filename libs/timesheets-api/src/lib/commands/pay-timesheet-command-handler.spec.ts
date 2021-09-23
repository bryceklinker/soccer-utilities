import { CommandBus } from '@nestjs/cqrs';
import {
  TestingRepository,
  TestingRepositoryFactory,
} from '@soccer-utilities/data-access/testing';
import { RepositoryFactory } from '@soccer-utilities/data-access';
import { TimesheetStatus } from '@soccer-utilities/models';
import { UserTimesheetEntity } from '../entities/user-timesheet.entity';
import { setupTestingModule } from '../../testing';
import { PayTimesheetCommand } from './pay-timesheet-command-handler';

describe('PayTimesheetCommandHandler', () => {
  let commandBus: CommandBus;
  let repository: TestingRepository<UserTimesheetEntity>;

  beforeEach(async () => {
    const app = await setupTestingModule();

    const repositoryFactory = app.get(
      RepositoryFactory
    ) as TestingRepositoryFactory;
    repository = repositoryFactory.setupRepository(UserTimesheetEntity);
    commandBus = app.get(CommandBus);
  });

  test('when timesheet is paid then timesheet is marked as paid', async () => {
    const original = await addClosedTimesheet('jack');

    await commandBus.execute(new PayTimesheetCommand(original.id));

    const updated = await repository.getById(original.id);
    expect(updated.status).toEqual(TimesheetStatus.Paid);
  });

  test('when timesheet is missing then throws error', async () => {
    await expect(() =>
      commandBus.execute(new PayTimesheetCommand('idk'))
    ).rejects.toThrowError('idk');
  });

  async function addClosedTimesheet(
    username: string
  ): Promise<UserTimesheetEntity> {
    const timesheet = new UserTimesheetEntity(username, 12);
    timesheet.clockIn();
    timesheet.clockOut();
    return await repository.create(timesheet);
  }
});
