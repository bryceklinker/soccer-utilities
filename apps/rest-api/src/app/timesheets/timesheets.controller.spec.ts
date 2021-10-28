import { TestingRepository } from '@soccer-utilities/data-access/testing';
import { UserTimesheetEntity } from '@soccer-utilities/timesheets-api';
import {
  ListResult,
  TimesheetStatus,
  UserTimesheetModel,
} from '@soccer-utilities/models';
import { ApiFixture } from '../../testing/api-fixture';
import { ADMIN_USER, CONCESSIONS_USER } from '../../testing/users';
import { constants } from 'http2';

describe('Timesheets Api', () => {
  let fixture: ApiFixture;
  let repository: TestingRepository<UserTimesheetEntity>;

  beforeEach(async () => {
    fixture = new ApiFixture();
    await fixture.start();

    repository = fixture.repositoryFactory.setupRepository(UserTimesheetEntity);
  });

  test('when getting current timesheet then returns timesheet for current user', async () => {
    const timesheet =
      await getRestApiAsConcessionsUser().get<UserTimesheetModel>(
        '/timesheets/current'
      );

    expect(timesheet.username).toEqual(CONCESSIONS_USER.username);
    expect(timesheet.rate).toEqual(CONCESSIONS_USER.user_metadata.rate);
  });

  test('when getting timesheets as concessions user then returns forbidden', async () => {
    const response = await getRestApiAsConcessionsUser().getResponse(
      '/timesheets'
    );

    expect(response.status).toEqual(constants.HTTP_STATUS_FORBIDDEN);
  });

  test('when getting timesheets then returns all timesheets', async () => {
    await repository.create(new UserTimesheetEntity('bob', 12));
    await repository.create(new UserTimesheetEntity('bob', 12));
    await repository.create(new UserTimesheetEntity('bob', 12));

    const result = await getRestApiAsAdminUser().get<
      ListResult<UserTimesheetModel>
    >('/timesheets');

    expect(result.items).toHaveLength(3);
  });

  test('when getting timesheets with query parameters then returns timesheets matching query parameters', async () => {
    const params = new URLSearchParams({
      status: TimesheetStatus.Complete,
      username: 'jack',
    });
    await getRestApiAsAdminUser().get<ListResult<UserTimesheetModel>>(
      `/timesheets?${params}`
    );

    const query = repository.getExecutedQueries()[0];
    expect(query).toHaveQueryParameter({ name: 'username', value: 'jack' });
    expect(query).toHaveQueryParameter({
      name: 'status',
      value: TimesheetStatus.Complete,
    });
  });

  test('when user clocks in then adds timesheet for user', async () => {
    const timesheet =
      await getRestApiAsConcessionsUser().post<UserTimesheetModel>(
        '/timesheets/current/clock-in'
      );

    expect(timesheet.username).toEqual(CONCESSIONS_USER.username);
    expect(timesheet.rate).toEqual(CONCESSIONS_USER.user_metadata.rate);
    expect(timesheet.timeIn).toBeDefined();
  });

  test('when user clocks out then updates timesheet for user', async () => {
    await getRestApiAsConcessionsUser().post('/timesheets/current/clock-in');
    const timesheet =
      await getRestApiAsConcessionsUser().post<UserTimesheetModel>(
        '/timesheets/current/clock-out'
      );

    expect(timesheet.timeOut).toBeDefined();
  });

  test('when user pays then updates timesheet for user', async () => {
    const timesheet =
      await getRestApiAsConcessionsUser().post<UserTimesheetModel>(
        '/timesheets/current/clock-in'
      );
    await getRestApiAsConcessionsUser().post('/timesheets/current/clock-out');
    const paidTimesheet =
      await getRestApiAsAdminUser().post<UserTimesheetModel>(
        `/timesheets/${timesheet.id}/pay`
      );

    expect(paidTimesheet.status).toEqual(TimesheetStatus.Paid);
  });

  test('when timesheet is deleted then removes timesheet', async () => {
    const timesheet =
      await getRestApiAsConcessionsUser().post<UserTimesheetEntity>(
        `/timesheets/current/clock-in`
      );
    await getRestApiAsAdminUser().delete(`/timesheets/${timesheet.id}`);

    const response = await getRestApiAsAdminUser().get<
      ListResult<UserTimesheetEntity>
    >('/timesheets');
    expect(response.items).not.toContainEqual(timesheet);
  });

  afterEach(async () => {
    await fixture.stop();
  });

  function getRestApiAsConcessionsUser() {
    return fixture.createRestApi(CONCESSIONS_USER);
  }

  function getRestApiAsAdminUser() {
    return fixture.createRestApi(ADMIN_USER);
  }
});
