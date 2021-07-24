import {
  AgeGroupModel,
  GameModel,
  RefereeCheckModel,
  RefereeModel,
  RefereePayScaleModel,
  RefereeType,
} from '@soccer-utilities/models';

const MISSING_PAY_SCALE_AMOUNT = -1;

function sortPayScalesByAscendingAgeGroup(
  payScales: Array<RefereePayScaleModel>
): Array<RefereePayScaleModel> {
  return payScales.sort((one, two) => {
    if (one.ageGroup.age === two.ageGroup.age) {
      return 0;
    }

    if (one.ageGroup.age < two.ageGroup.age) {
      return -1;
    }

    return 1;
  });
}

function locatePayScaleForReferee(
  type: RefereeType,
  ageGroup: AgeGroupModel,
  payScales: Array<RefereePayScaleModel>
): RefereePayScaleModel | null {
  const payScalesForType = payScales.filter((p) => p.refereeType === type);
  const sortedPayScales = sortPayScalesByAscendingAgeGroup(payScalesForType);
  return sortedPayScales.find((p) => p.ageGroup.age >= ageGroup.age) || null;
}

function generateFromReferee(
  referee: RefereeModel,
  game: GameModel,
  payScales: Array<RefereePayScaleModel>
): RefereeCheckModel {
  const payScale = locatePayScaleForReferee(
    referee.type,
    game.ageGroup,
    payScales
  );
  return {
    name: referee.name,
    type: referee.type,
    ageGroup: game.ageGroup,
    time: game.time,
    date: game.date,
    amount: payScale ? payScale.amount : MISSING_PAY_SCALE_AMOUNT,
  };
}

function generateFromGame(
  game: GameModel,
  payScales: Array<RefereePayScaleModel>
): Array<RefereeCheckModel> {
  return game.referees.map((referee) =>
    generateFromReferee(referee, game, payScales)
  );
}

function generateFromGames(
  games: Array<GameModel>,
  payScales: Array<RefereePayScaleModel>
): Array<RefereeCheckModel> {
  return games.flatMap((g) => generateFromGame(g, payScales));
}

export const RefereeChecksGenerator = {
  generateFromGame,
  generateFromGames,
};
