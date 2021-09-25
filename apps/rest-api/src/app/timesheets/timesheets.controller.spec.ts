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
    await getRestApiAsConcessionsUser().post('/timesheets/clock-in');

    const entities = await repository.getAll();
    expect(entities).toHaveLength(1);
    expect(entities[0].username).toEqual(CONCESSIONS_USER.username);
    expect(entities[0].rate).toEqual(CONCESSIONS_USER.user_metadata.rate);
    expect(entities[0].timeIn).toBeDefined();
  });

  test('when user clocks out then updates timesheet for user', async () => {
    await getRestApiAsConcessionsUser().post('/timesheets/clock-in');
    await getRestApiAsConcessionsUser().post('/timesheets/clock-out');

    const entities = await repository.getAll();
    expect(entities).toHaveLength(1);
    expect(entities[0].timeOut).toBeDefined();
  });

  test('when user pays then updates timesheet for user', async () => {
    const id = await getRestApiAsConcessionsUser().post('/timesheets/clock-in');
    await getRestApiAsConcessionsUser().post('/timesheets/clock-out');
    await getRestApiAsAdminUser().post(`/timesheets/${id}/pay`);

    const entities = await repository.getAll();
    expect(entities).toHaveLength(1);
    expect(entities[0].status).toEqual(TimesheetStatus.Paid);
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
