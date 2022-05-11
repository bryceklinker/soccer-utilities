import { format } from 'date-fns';
import faker from '@faker-js/faker';
import {
  AgeGroupModel,
  ClientRefereeCheckModel,
  DATE_FORMAT,
  GameModel,
  GameScheduleModel,
  Genders,
  List,
  ListResult,
  NotificationModel,
  RefereeCheckModel,
  RefereeModel,
  RefereePayScaleModel,
  RefereeReimbursementCheckModel,
  RefereeType,
  RefereeTypes,
  Roles,
  TIME_FORMAT,
  TimesheetStatus,
  UiUserTimesheetModel,
  UserModel,
  UserRoleModel,
  UserTimesheetModel,
} from '@soccer-utilities/models';

function createAgeGroup(ageGroup: Partial<AgeGroupModel> = {}): AgeGroupModel {
  return {
    age: faker.datatype.number({ min: 5, max: 19 }),
    gender: faker.helpers.arrayElement(Genders),
    ...ageGroup,
  };
}

function createReferee(referee: Partial<RefereeModel> = {}): RefereeModel {
  return {
    name: faker.name.lastName(),
    type: faker.helpers.arrayElement(RefereeTypes),
    ...referee,
  };
}

function createGame(game: Partial<GameModel> = {}): GameModel {
  const ageGroup = createAgeGroup(game.ageGroup);
  return {
    date: faker.date.recent().toDateString(),
    awayTeam: faker.hacker.noun(),
    division: `U${ageGroup.age} ${ageGroup.gender}`,
    ageGroup,
    field: faker.address.county(),
    homeTeam: faker.hacker.noun(),
    time: faker.date.soon().toTimeString(),
    referees: [
      createReferee({ type: RefereeType.Center }),
      createReferee({ type: RefereeType.Assistant }),
      createReferee({ type: RefereeType.Assistant }),
    ],
    ...game,
  };
}

function createGameSchedule(
  schedule: Partial<GameScheduleModel> = {}
): GameScheduleModel {
  return {
    lastUpdated: faker.date.recent().toISOString(),
    games: [createGame(), createGame(), createGame()],
    ...schedule,
  };
}

function createPayScale(
  model: Partial<RefereePayScaleModel>
): RefereePayScaleModel {
  return {
    ageGroup: createAgeGroup(),
    amount: faker.datatype.number({ min: 15, max: 50 }),
    refereeType: faker.helpers.arrayElement(RefereeTypes),
    ...model,
  };
}

function createRefereeCheck(
  model: Partial<RefereeCheckModel> = {}
): RefereeCheckModel {
  return {
    date: format(faker.date.soon(), DATE_FORMAT),
    time: format(faker.date.recent(), TIME_FORMAT),
    amount: faker.datatype.number(),
    type: faker.helpers.arrayElement(RefereeTypes),
    name: faker.name.firstName(),
    ageGroup: createAgeGroup(model.ageGroup),
    ...model,
  };
}

function createRefereeReimbursementCheck(
  model: Partial<RefereeReimbursementCheckModel> = {}
): RefereeReimbursementCheckModel {
  return {
    referee: `${faker.name.firstName()} ${faker.name.lastName()}`,
    amount: faker.datatype.number(),
    games: [],
    ...model,
  };
}

function createClientRefereeCheckModel(
  model: Partial<ClientRefereeCheckModel> = {}
): ClientRefereeCheckModel {
  return {
    ...createRefereeCheck(model),
    id: faker.datatype.uuid(),
    hasBeenWritten: false,
    ...model,
  };
}

function createNotificationModel(
  model: Partial<NotificationModel> = {}
): NotificationModel {
  return {
    id: faker.datatype.uuid(),
    message: faker.lorem.sentence(),
    ...model,
  };
}

function createUserTimesheetModel(
  model: Partial<UserTimesheetModel> = {}
): UserTimesheetModel {
  return {
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    rate: faker.datatype.number(20),
    status: TimesheetStatus.New,
    amount: 0,
    ...model,
  };
}

function createUiUserTimesheetModel(
  model: Partial<UiUserTimesheetModel> = {}
): UiUserTimesheetModel {
  return {
    ...createUserTimesheetModel(model),
    ...model,
  };
}

function createUserRole(model: Partial<UserRoleModel> = {}): UserRoleModel {
  return {
    id: faker.datatype.uuid(),
    name: faker.helpers.arrayElement(Roles),
    ...model,
  };
}

function createUser(model: Partial<UserModel> = {}): UserModel {
  return {
    username: faker.internet.userName(),
    roles: [],
    ...model,
  };
}

function createMany<T>(factory: () => T, count: number): Array<T> {
  const items: Array<T> = [];
  for (let i = 0; i < count; i++) {
    items.push(factory());
  }
  return items;
}

function createListResult<T>(factory: () => T, count: number): ListResult<T> {
  const items = createMany(factory, count);
  return List.fromArray(items);
}

export const ModelFactory = {
  createAgeGroup,
  createReferee,
  createGame,
  createGameSchedule,
  createPayScale,
  createRefereeCheck,
  createRefereeReimbursementCheck,
  createClientRefereeCheckModel,
  createNotificationModel,
  createUserTimesheetModel,
  createUiUserTimesheetModel,
  createUserRole,
  createUser,
  createMany,
  createListResult,
};
