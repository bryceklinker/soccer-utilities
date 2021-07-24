import { ModelFactory } from '@soccer-utilities/testing-support';
import { RefereeModel, RefereeType } from '@soccer-utilities/models';
import { RefereeChecksGenerator } from './referee-checks-generator';

describe('RefereeChecksGenerator', () => {
  test('when game has one center referee then returns one referee check', () => {
    const game = createGame(
      8,
      ModelFactory.createReferee({ type: RefereeType.Center, name: 'Jim' })
    );
    const payScale = createPayScale(8, 30);

    const checks = RefereeChecksGenerator.generateFromGame(game, [payScale]);

    expect(checks).toHaveLength(1);
    expect(checks).toContainEqual({
      date: game.date,
      time: game.time,
      name: 'Jim',
      type: RefereeType.Center,
      ageGroup: game.ageGroup,
      amount: 30,
    });
  });

  test('when game has one center referee then uses pay scale for referee type and age', () => {
    const game = createGame(
      10,
      ModelFactory.createReferee({ type: RefereeType.Center, name: 'Jim' })
    );
    const youngerPayScale = createPayScale(8, 20);
    const correctPayScale = createPayScale(10, 30);
    const olderPayScale = createPayScale(12, 40);

    const checks = RefereeChecksGenerator.generateFromGame(game, [
      youngerPayScale,
      correctPayScale,
      olderPayScale,
    ]);

    expect(checks).toHaveLength(1);
    expect(checks[0].amount).toEqual(30);
  });

  test('when game has one assistant referee then uses pay scale for referee type and age group', () => {
    const game = createGame(
      10,
      ModelFactory.createReferee({ type: RefereeType.Assistant, name: 'Jim' })
    );
    const otherRefereeType = createPayScale(10, 20, RefereeType.Center);
    const correctPayScale = createPayScale(10, 10, RefereeType.Assistant);
    const olderPayScale = createPayScale(12, 40);

    const checks = RefereeChecksGenerator.generateFromGame(game, [
      otherRefereeType,
      correctPayScale,
      olderPayScale,
    ]);

    expect(checks).toHaveLength(1);
    expect(checks[0].amount).toEqual(10);
  });

  test('when game age group is between pay scales then uses pay scale for older age group', () => {
    const game = createGame(
      11,
      ModelFactory.createReferee({ type: RefereeType.Center, name: 'Jim' })
    );
    const youngerPayScale = createPayScale(10, 20);
    const correctPayScale = createPayScale(12, 30);

    const checks = RefereeChecksGenerator.generateFromGame(game, [
      youngerPayScale,
      correctPayScale,
    ]);

    expect(checks).toHaveLength(1);
    expect(checks[0].amount).toEqual(30);
  });

  test('when no matching pay scale is found then uses -1 for amount', () => {
    const game = createGame(
      12,
      ModelFactory.createReferee({ type: RefereeType.Center })
    );

    const checks = RefereeChecksGenerator.generateFromGame(game, []);

    expect(checks).toHaveLength(1);
    expect(checks[0].amount).toEqual(-1);
  });

  test('when game has multiple referees then returns check for each referee', () => {
    const game = createGame(
      12,
      ModelFactory.createReferee({ type: RefereeType.Center, name: 'stacey' }),
      ModelFactory.createReferee({
        type: RefereeType.Assistant,
        name: 'wyatt',
      }),
      ModelFactory.createReferee({
        type: RefereeType.Assistant,
        name: 'sophia',
      })
    );

    const centerScale = createPayScale(12, 12, RefereeType.Center);
    const assistantScale = createPayScale(12, 6, RefereeType.Assistant);

    const checks = RefereeChecksGenerator.generateFromGame(game, [
      centerScale,
      assistantScale,
    ]);

    expect(checks).toHaveLength(3);
    expect(checks).toContainEqual(
      expect.objectContaining({ amount: 12, name: 'stacey' })
    );
    expect(checks).toContainEqual(
      expect.objectContaining({ amount: 6, name: 'sophia' })
    );
    expect(checks).toContainEqual(
      expect.objectContaining({ amount: 6, name: 'wyatt' })
    );
  });

  test('when generating for multiple games then returns referees from all games', () => {
    const games = [
      createGame(8, ModelFactory.createReferee({ type: RefereeType.Center })),
      createGame(
        10,
        ModelFactory.createReferee({ type: RefereeType.Center }),
        ModelFactory.createReferee({ type: RefereeType.Assistant }),
        ModelFactory.createReferee({ type: RefereeType.Assistant })
      ),
      createGame(8, ModelFactory.createReferee({ type: RefereeType.Center })),
    ];

    const u8Center = createPayScale(8, 15, RefereeType.Center);
    const u10Center = createPayScale(10, 20, RefereeType.Center);
    const u10Assistant = createPayScale(10, 15, RefereeType.Assistant);

    const checks = RefereeChecksGenerator.generateFromGames(games, [
      u10Center,
      u10Assistant,
      u8Center,
    ]);

    expect(checks).toHaveLength(5);
  });

  function createGame(age: number, ...referees: Array<RefereeModel>) {
    return ModelFactory.createGame({
      ageGroup: ModelFactory.createAgeGroup({ age }),
      referees: referees,
    });
  }

  function createPayScale(
    age: number,
    amount: number,
    refereeType: RefereeType = RefereeType.Center
  ) {
    return ModelFactory.createPayScale({
      refereeType: refereeType,
      amount: amount,
      ageGroup: ModelFactory.createAgeGroup({ age }),
    });
  }
});
