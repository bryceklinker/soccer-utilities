import {
  AgeGroupModel, DATE_FORMAT,
  GameModel,
  GameScheduleModel,
  Genders, List, ListResult,
  RefereeCheckModel,
  RefereeModel,
  RefereePayScaleModel,
  RefereeType,
  RefereeTypes, TIME_FORMAT
} from '@soccer-utilities/core';
import { format } from 'date-fns';
import * as faker from 'faker';
import { ClientRefereeCheckModel } from '@soccer-utilities/schedules-ui';

function createAgeGroup(ageGroup: Partial<AgeGroupModel> = {}): AgeGroupModel {
  return {
    age: faker.datatype.number({ min: 5, max: 19 }),
    gender: faker.random.arrayElement(Genders),
    ...ageGroup
  };
}

function createReferee(referee: Partial<RefereeModel> = {}): RefereeModel {
  return {
    name: faker.name.lastName(),
    type: faker.random.arrayElement(RefereeTypes),
    ...referee
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
      createReferee({ type: RefereeType.Assistant })
    ],
    ...game
  };
}

function createGameSchedule(
  schedule: Partial<GameScheduleModel> = {}
): GameScheduleModel {
  return {
    lastUpdated: faker.date.recent().toISOString(),
    games: [createGame(), createGame(), createGame()],
    ...schedule
  };
}

function createPayScale(model: Partial<RefereePayScaleModel>): RefereePayScaleModel {
  return {
    ageGroup: createAgeGroup(),
    amount: faker.datatype.number({ min: 15, max: 50 }),
    refereeType: faker.random.arrayElement(RefereeTypes),
    ...model
  };
}

function createRefereeCheck(model: Partial<RefereeCheckModel> = {}): RefereeCheckModel {
  return {
    date: format(faker.date.soon(), DATE_FORMAT),
    time: format(faker.time.recent(), TIME_FORMAT),
    amount: faker.datatype.number(),
    type: faker.random.arrayElement(RefereeTypes),
    name: faker.name.firstName(),
    ageGroup: createAgeGroup(model.ageGroup),
    ...model
  };
}

function createClientRefereeCheckModel(model: Partial<ClientRefereeCheckModel> = {}): ClientRefereeCheckModel {
  return {
    ...createRefereeCheck(model),
    id: faker.datatype.uuid(),
    hasBeenWritten: false,
    ...model
  }
}

function createMany<T>(factory: () => T, count: number): Array<T> {
  const items: Array<T> = [];
  for (let i = 0; i < count; i++) {
    items.push(factory());
  }
  return items;
}

function createList<T>(factory: () => T, count: number): ListResult<T> {
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
  createClientRefereeCheckModel,
  createMany,
  createListResult: createList
};
