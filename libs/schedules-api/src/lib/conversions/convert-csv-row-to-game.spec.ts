import { convertCsvRowToGame } from './convert-csv-row-to-game';
import { Gender, RefereeType } from '@soccer-utilities/models';

describe('convertCsvRowToGame', () => {
  test('when row is converted to game then game is populated from row', () => {
    const row = {
      'Game Date': '4/10/2021',
      'Game Time': '9:00:00 AM',
      'Home Team': 'Bad News Bears',
      'Away Team': 'Honkies',
      Field: 'Field 1',
      Division: 'U8 Girls',
      Center: 'Bill',
      AR1: 'John',
      AR2: 'Jim',
    };

    const game = convertCsvRowToGame(row);

    expect(game).toEqual({
      date: '2021-04-10',
      time: '09:00 AM',
      homeTeam: 'Bad News Bears',
      awayTeam: 'Honkies',
      field: 'Field 1',
      division: 'U8 Girls',
      ageGroup: { gender: Gender.Girls, age: 8 },
      referees: [
        { type: RefereeType.Center, name: 'Bill' },
        { type: RefereeType.Assistant, name: 'John' },
        { type: RefereeType.Assistant, name: 'Jim' },
      ],
    });
  });

  test('when game has empty data then returns null', () => {
    const row = {
      'Game Date': '',
      'Game Time': '',
      'Home Team': '',
      'Away Team': '',
      Field: '',
      Division: '',
      Center: '',
      AR1: '',
      AR2: '',
    };

    const game = convertCsvRowToGame(row);

    expect(game).toEqual(null);
  });

  test('when game has different column names then returns values from alternative columns', () => {
    const row = {
      Date: '4/10/2021',
      Time: '9:00:00 AM',
      Home: 'Bad News Bears',
      Away: 'Honkies',
      Field: 'Field 1',
      Division: 'U8 Girls',
      Center: 'Bill',
      AR1: 'John',
      AR2: 'Jim',
    };

    const game = convertCsvRowToGame(row);

    expect(game).toEqual({
      date: '2021-04-10',
      time: '09:00 AM',
      homeTeam: 'Bad News Bears',
      awayTeam: 'Honkies',
      field: 'Field 1',
      division: 'U8 Girls',
      ageGroup: { gender: Gender.Girls, age: 8 },
      referees: [
        { type: RefereeType.Center, name: 'Bill' },
        { type: RefereeType.Assistant, name: 'John' },
        { type: RefereeType.Assistant, name: 'Jim' },
      ],
    });
  });

  test('when home is Iowa Storm then returns null', () => {
    const row = {
      Date: '4/10/2021',
      Time: '9:00:00 AM',
      Home: 'Iowa Storm Soccer Club 2012',
      Away: 'Honkies',
      Field: 'Field 1',
      Division: 'U8 Girls',
      Center: 'Bill',
      AR1: 'John',
      AR2: 'Jim',
    };

    const game = convertCsvRowToGame(row);

    expect(game).toEqual(null);
  });

  test('when home team is Iowa Storm then returns null', () => {
    const row = {
      'Game Date': '4/10/2021',
      'Game Time': '9:00:00 AM',
      'Home Team': 'iowa STORM Soccer Club 2011',
      'Away Team': 'Honkies',
      Field: 'Field 1',
      Division: 'U8 Girls',
      Center: 'Bill',
      AR1: 'John',
      AR2: 'Jim',
    };

    const game = convertCsvRowToGame(row);

    expect(game).toEqual(null);
  });
});
