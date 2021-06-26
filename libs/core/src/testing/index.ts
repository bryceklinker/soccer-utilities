import {
  AgeGroup,
  GameModel,
  GameScheduleModel,
  Genders,
  RefereeModel,
  RefereeType,
  RefereeTypes,
} from '../lib';
import * as faker from 'faker';

function createAgeGroup(ageGroup: Partial<AgeGroup> = {}): AgeGroup {
  return {
    age: faker.datatype.number({ min: 5, max: 19 }),
    gender: faker.random.arrayElement(Genders),
    ...ageGroup,
  };
}

function createReferee(referee: Partial<RefereeModel> = {}): RefereeModel {
  return {
    name: faker.name.lastName(),
    type: faker.random.arrayElement(RefereeTypes),
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

function createMany<T>(factory: () => T, count: number): Array<T> {
  const items: Array<T> = [];
  for (let i = 0; i < count; i++) {
    items.push(factory());
  }
  return items;
}

export const ModelFactory = {
  createAgeGroup,
  createReferee,
  createGame,
  createGameSchedule,
  createMany
};
