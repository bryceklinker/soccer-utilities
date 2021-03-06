import { ModelFactory } from '@soccer-utilities/testing-support';
import { AuthUser } from '../app/auth/state/auth-models';
import faker from '@faker-js/faker';
import { SettingsModel } from '../app/settings/state/settings-model';

function createAuthUser(model: Partial<AuthUser> = {}): AuthUser {
  return {
    sub: faker.datatype.uuid(),
    name: faker.name.lastName(),
    address: faker.address.streetAddress(),
    email: faker.internet.email(),
    email_verified: faker.datatype.boolean(),
    accessToken: faker.random.alphaNumeric(20),
    ...model,
  };
}

function createSettings(model: Partial<SettingsModel> = {}): SettingsModel {
  return {
    auth: {
      domain: faker.internet.domainName(),
      audience: faker.internet.url(),
      clientId: faker.datatype.uuid(),
      ...model.auth,
    },
    api: {
      url: faker.internet.url(),
      ...model.api,
    },
    logging: {
      instrumentationKey: faker.datatype.uuid(),
    },
    ...model,
  };
}

export const WebUiModelFactory = {
  ...ModelFactory,
  createAuthUser,
  createSettings,
};
