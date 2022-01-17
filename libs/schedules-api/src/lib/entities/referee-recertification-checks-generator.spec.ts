import { RefereeRecertificationChecksGenerator } from './referee-recertification-checks-generator';
import { ModelFactory } from '@soccer-utilities/testing-support';
import { GameModel, RefereeModel, RefereeType } from '@soccer-utilities/models';

describe('RefereeRecertificationChecksGenerator', () => {
  test('when ref has centered one U8 game then $5 towards reimbursement', () => {
    const games = [
      createGameWithReferee(8, { name: 'John', type: RefereeType.Center }),
    ];

    const reimbursements =
      RefereeRecertificationChecksGenerator.generateFromScheduledGames(games);

    expectReimbursement(reimbursements, 'John', 5);
  });

  test('when ref has centered one U10 game then $5 towards reimbursement', () => {
    const games = [
      createGameWithReferee(10, { name: 'Jack', type: RefereeType.Center }),
    ];

    const reimbursements =
      RefereeRecertificationChecksGenerator.generateFromScheduledGames(games);

    expectReimbursement(reimbursements, 'Jack', 5);
  });

  test('when ref has centered one U11 game then $10 towards reimbursement', () => {
    const games = [
      createGameWithReferee(11, { name: 'jack', type: RefereeType.Center }),
    ];

    const reimbursements =
      RefereeRecertificationChecksGenerator.generateFromScheduledGames(games);

    expectReimbursement(reimbursements, 'jack', 10);
  });

  test('when ref has centered one U19 game then $10 towards reimbursement', () => {
    const games = [
      createGameWithReferee(19, { name: 'Jack', type: RefereeType.Center }),
    ];

    const reimbursements =
      RefereeRecertificationChecksGenerator.generateFromScheduledGames(games);

    expectReimbursement(reimbursements, 'Jack', 10);
  });

  test('when ref has been an assistant for one game then $5 towards reimbursement', () => {
    const games = [
      createGameWithReferee(19, { name: 'jack', type: RefereeType.Assistant }),
    ];

    const reimbursements =
      RefereeRecertificationChecksGenerator.generateFromScheduledGames(games);

    expectReimbursement(reimbursements, 'jack', 5);
  });

  test('when ref has done six U19 centers then max reimbursement amount', () => {
    const games = createMultipleGamesWithReferee(
      19,
      'Jack',
      RefereeType.Center,
      7
    );

    const reimbursements =
      RefereeRecertificationChecksGenerator.generateFromScheduledGames(games);

    expectReimbursement(reimbursements, 'Jack', 60);
  });

  test('when ref has been an assistant twelve times then max reimbursement amount', () => {
    const games = createMultipleGamesWithReferee(
      19,
      'Jack',
      RefereeType.Assistant,
      12
    );

    const reimbursements =
      RefereeRecertificationChecksGenerator.generateFromScheduledGames(games);

    expectReimbursement(reimbursements, 'Jack', 60);
  });

  test('when grouping refs then case of name is ignored', () => {
    const games = [
      createGameWithReferee(19, { name: 'JACK', type: RefereeType.Center }),
      createGameWithReferee(19, { name: 'jack', type: RefereeType.Center }),
    ];

    const reimbursements =
      RefereeRecertificationChecksGenerator.generateFromScheduledGames(games);

    expect(reimbursements).toHaveLength(1);
  });

  test('when creating reimbursements then games for reimbursement are included', () => {
    const games = [
      createGameWithReferee(19, { name: 'JACK', type: RefereeType.Center }),
    ];

    const reimbursements =
      RefereeRecertificationChecksGenerator.generateFromScheduledGames(games);

    expect(reimbursements[0].games).toContainEqual(games[0]);
  });

  test('when multiple referees then reimbursements are sorted by referee name', () => {
    const games = [
      createGameWithReferee(19, { name: 'b', type: RefereeType.Center }),
      createGameWithReferee(19, { name: 'c', type: RefereeType.Center }),
      createGameWithReferee(19, { name: 'a', type: RefereeType.Center }),
    ];

    const reimbursements =
      RefereeRecertificationChecksGenerator.generateFromScheduledGames(games);

    expect(reimbursements[0].referee).toEqual('a');
    expect(reimbursements[1].referee).toEqual('b');
    expect(reimbursements[2].referee).toEqual('c');
  });

  function createMultipleGamesWithReferee(
    age: number,
    referee: string,
    type: RefereeType,
    count: number
  ) {
    const items = [] as Array<GameModel>;
    for (let i = 0; i < count; i++) {
      items.push(createGameWithReferee(age, { name: referee, type }));
    }
    return items;
  }

  function createGameWithReferee(
    age: number,
    ref: Partial<RefereeModel> = {}
  ): GameModel {
    return ModelFactory.createGame({
      ageGroup: ModelFactory.createAgeGroup({ age: age }),
      referees: [ModelFactory.createReferee(ref)],
    });
  }

  function expectReimbursement(reimbursements, referee, amount) {
    expect(reimbursements).toContainEqual(
      expect.objectContaining({ referee, amount })
    );
  }
});
