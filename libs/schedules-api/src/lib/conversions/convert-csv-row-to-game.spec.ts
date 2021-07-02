import { convertCsvRowToGame } from './convert-csv-row-to-game';
import { Gender, RefereeType } from '@soccer-utilities/core';

describe('convertCsvRowToGame', () => {
  test('when row is converted to game then game is populated from row', () => {
    const row = {
      'Game Date': '4/10/2021',
      'Game Time': '9:00 AM',
      'Home Team': 'Bad News Bears',
      'Away Team': 'Honkies',
      Field: 'Field 1',
      Division: 'U8 Girls',
      Center: 'Bill',
      AR1: 'John',
      AR2: 'Jim'
    };

    const game = convertCsvRowToGame(row);

    expect(game).toEqual({
      date: '4/10/2021',
      time: '9:00 AM',
      homeTeam: 'Bad News Bears',
      awayTeam: 'Honkies',
      field: 'Field 1',
      division: 'U8 Girls',
      ageGroup: {gender: Gender.Girls, age: 8},
      referees: [
        {type: RefereeType.Center, name: 'Bill'},
        {type: RefereeType.Assistant, name: 'John'},
        {type: RefereeType.Assistant, name: 'Jim'},
      ]
    });
  });
});