import { UserTimesheetEntity } from '../entities/user-timesheet.entity';
import { parseISO } from 'date-fns';
import { Repository } from '@soccer-utilities/data-access';
import { ClockOutCommand } from './clock-out-command-handler';
import { setupCommandTest } from '../../testing/setup-command-test';

const CURRENT_TIME = '2021-09-23T12:23:12.345Z';

describe('ClockOutCommandHandler', () => {
  beforeEach(async () => {
    jest.useFakeTimers('modern').setSystemTime(parseISO(CURRENT_TIME));
  });

  test('when user clocks out then timesheet is clocked out', async () => {
    const { repository, commandBus } = await setupCommandTest();
    const original = await addOpenTimesheet('bill', repository);

    const updated = await commandBus.execute(new ClockOutCommand('bill'));

    expect(updated.id).toEqual(original.id);
    expect(updated.timeOut).toEqual(CURRENT_TIME);
  });

  test('when user is missing open timesheet then throws error', async () => {
    const { commandBus } = await setupCommandTest();
    await expect(() =>
      commandBus.execute(new ClockOutCommand('bill'))
    ).rejects.toThrowError('bill');
  });

  async function addOpenTimesheet(
    username: string,
    repository: Repository<UserTimesheetEntity>
  ) {
    const timesheet = new UserTimesheetEntity(username, 12);
    timesheet.clockIn();
    return await repository.create(timesheet);
  }
});
