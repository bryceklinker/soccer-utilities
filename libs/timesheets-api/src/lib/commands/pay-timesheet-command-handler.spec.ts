import { Repository } from '@soccer-utilities/data-access';
import { TimesheetStatus } from '@soccer-utilities/models';
import { UserTimesheetEntity } from '../entities/user-timesheet.entity';
import { PayTimesheetCommand } from './pay-timesheet-command-handler';
import { setupCommandTest } from '../../testing/setup-command-test';

describe('PayTimesheetCommandHandler', () => {
  test('when timesheet is paid then timesheet is marked as paid', async () => {
    const { commandBus, repository } = await setupCommandTest();
    const original = await addClosedTimesheet('jack', repository);

    const updated = await commandBus.execute(
      new PayTimesheetCommand(original.id)
    );

    expect(updated.id).toEqual(original.id);
    expect(updated.status).toEqual(TimesheetStatus.Paid);
  });

  test('when timesheet is missing then throws error', async () => {
    const { commandBus } = await setupCommandTest();
    await expect(() =>
      commandBus.execute(new PayTimesheetCommand('idk'))
    ).rejects.toThrowError('idk');
  });

  async function addClosedTimesheet(
    username: string,
    repository: Repository<UserTimesheetEntity>
  ): Promise<UserTimesheetEntity> {
    const timesheet = new UserTimesheetEntity(username, 12);
    timesheet.clockIn();
    timesheet.clockOut();
    return await repository.create(timesheet);
  }
});
