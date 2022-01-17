import {
  GameModel,
  RefereeModel,
  RefereeReimbursementCheckModel,
  RefereeType,
} from '@soccer-utilities/models';

const MAX_REIMBURSEMENT_AMOUNT = 60;

type RefereeGameModel = {
  referee: RefereeModel;
  game: GameModel;
};

function normalizeRefereeName(referee: RefereeModel): string {
  return referee.name.toLowerCase().trim();
}

function getReimbursementAmountForGame({
  referee,
  game,
}: RefereeGameModel): number {
  if (referee.type === RefereeType.Assistant) {
    return 5;
  }

  return game.ageGroup.age < 11 ? 5 : 10;
}

function calculateReimbursement(
  refereeGames: Array<RefereeGameModel>
): RefereeReimbursementCheckModel {
  const reimbursementTotal = refereeGames.reduce(
    (result, value) => result + getReimbursementAmountForGame(value),
    0
  );

  const games = refereeGames.map((v) => v.game);
  const referee = refereeGames[0].referee;
  return {
    referee: referee.name,
    amount:
      reimbursementTotal > MAX_REIMBURSEMENT_AMOUNT
        ? MAX_REIMBURSEMENT_AMOUNT
        : reimbursementTotal,
    games,
  };
}

function generateFromScheduledGames(
  games: Array<GameModel>
): Array<RefereeReimbursementCheckModel> {
  const gamesPerReferee = games
    .reduce((result, game) => {
      return [
        ...result,
        ...game.referees.map((referee) => ({ referee, game })),
      ] as Array<RefereeGameModel>;
    }, [])
    .reduce((result, { game, referee }) => {
      const name = normalizeRefereeName(referee);
      return {
        ...result,
        [name]: [...(result[name] || []), { game, referee }],
      };
    }, {}) as { [name: string]: Array<RefereeGameModel> };

  const reimbursements = Object.keys(gamesPerReferee).map((name) =>
    calculateReimbursement(gamesPerReferee[name])
  );

  return [...reimbursements].sort((a, b) => (a.referee > b.referee ? 1 : -1));
}

export const RefereeRecertificationChecksGenerator = {
  generateFromScheduledGames,
};
