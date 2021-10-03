import { setupSagaTest } from '../../../testing/setup-saga-test';
import { ModelFactory } from '@soccer-utilities/testing-support';
import { Role } from '@soccer-utilities/models';
import { waitFor } from '@testing-library/dom';
import { TestingRestApiServer } from '../../../testing';
import { AuthActions } from './auth-actions';

describe('Auth Saga', () => {
  describe('Load Roles', () => {
    test('when load roles requested then loads roles from api', async () => {
      const { store, apiUrl } = setupSagaTest();
      const user = ModelFactory.createUser({
        roles: [
          ModelFactory.createUserRole({ name: Role.admin }),
          ModelFactory.createUserRole({ name: Role.concessions }),
        ],
      });
      TestingRestApiServer.setupGet(`${apiUrl}/users/current`, user);

      store.dispatch(AuthActions.loadRoles.request());

      await waitFor(() =>
        expect(store.getActions()).toContainEqual(
          AuthActions.loadRoles.success(user)
        )
      );
    });
  });
});
