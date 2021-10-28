import { setupCommandTest } from '../../testing/setup-command-test';
import { Repository } from '@soccer-utilities/data-access';
import { UserTimesheetEntity } from '../entities/user-timesheet.entity';
import { DeleteTimesheetCommand } from './delete-timesheet-command-handler';

describe('DeleteTimesheetCommandHandler', () => {
  test('when timesheet is deleted then timesheet is removed from repository', async () => {
    const { commandBus, repository } = await setupCommandTest();
    const timesheet = await addTimesheet(repository);

    await commandBus.execute(new DeleteTimesheetCommand(timesheet.id));

    expect(await repository.getAll()).toHaveLength(0);
  });

  test('when timesheet is missing then throws error', async () => {
    const { commandBus } = await setupCommandTest();

    await expect(() =>
      commandBus.execute(new DeleteTimesheetCommand('some-id'))
    ).rejects.toThrowError('some-id');
  });

  async function addTimesheet(
    repository: Repository<UserTimesheetEntity>
  ): Promise<UserTimesheetEntity> {
    const timesheet = new UserTimesheetEntity('some username');
    return await repository.create(timesheet);
  }
});
