import { UserModel } from '@soccer-utilities/models';
import { ApiFixture } from '../../testing/api-fixture';
import { ADMIN_USER } from '../../testing/users';

describe('Users Api', () => {
  let fixture: ApiFixture;

  beforeEach(async () => {
    fixture = new ApiFixture();
    await fixture.start();
  });

  test('when getting current user then returns current users information', async () => {
    const restApi = fixture.createRestApi(ADMIN_USER);

    const actual = await restApi.get<UserModel>('/users/current');

    expect(actual).toEqual(ADMIN_USER);
  });

  afterEach(async () => {
    await fixture.stop();
  });
});
