import { ModelFactory as UtilitiesModelFactory } from '@soccer-utilities/core/testing';
import { ApplicationUser } from '../app/auth';
import * as faker from 'faker';
import { SettingsModel } from '../app/settings';

function createUser(model: Partial<ApplicationUser> = {}): ApplicationUser {
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
    ...model,
  };
}

export const ModelFactory = {
  ...UtilitiesModelFactory,
  createUser,
  createSettings,
};
