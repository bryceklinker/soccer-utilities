import axios from 'axios';
import { constants } from 'http2';
import { ApiFixture } from '../../testing/api-fixture';

describe('Health Api', () => {
  let fixture: ApiFixture;

  beforeEach(async () => {
    fixture = new ApiFixture();
    await fixture.start();
  })

  test('when getting health then returns ok', async () => {
    const response = await axios.get(`/.health`, {baseURL: fixture.baseUrl});

    expect(response.status).toEqual(constants.HTTP_STATUS_OK);
  });

  afterEach(async () => {
    await fixture.stop();
  })
});
