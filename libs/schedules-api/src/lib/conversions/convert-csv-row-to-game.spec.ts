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

  test('when column names are spring 2022 column names then returns game from new format row', () => {
    const row = {
      Date: '4/2/2022',
      Time: '9:00 AM',
      Age: 'Girls 9/10U Rec Girls Rec',
      Home: 'Bondurant Soccer Club',
      'Home Team Number': 'G10A',
      Away: 'Iowa Rush',
      'Away Team Number': 'G10A',
      Complex: 'Bondurant West Complex',
      Field: 'Field 10-1',
      Center: 'Centy',
      AR1: 'Joe',
      AR2: 'Bob',
    };

    const game = convertCsvRowToGame(row);

    expect(game).toEqual({
      date: '2022-04-02',
      time: '09:00 AM',
      homeTeam: 'Bondurant Soccer Club',
      awayTeam: 'Iowa Rush',
      field: 'Field 10-1',
      division: 'Girls 9/10U Rec Girls Rec',
      ageGroup: { gender: Gender.Girls, age: 10 },
      referees: [
        { type: RefereeType.Center, name: 'Centy' },
        { type: RefereeType.Assistant, name: 'Joe' },
        { type: RefereeType.Assistant, name: 'Bob' },
      ],
    });
  });

  test('when column names are spring 2022 U7/8 Boys game then returns correct age group', () => {
    const row = {
      Date: '4/2/2022',
      Time: '9:00 AM',
      Age: 'Bondurant Soccer Club',
      Home: 'U7/8 Boys',
      'Home Team Number': 'Bondurant 16',
      Away: 'U7/8 Boys',
      'Away Team Number': 'Bondurant 9',
      Complex: 'Bondurant West Complex',
      Field: 'Field 8-1',
      Center: 'Centy',
      AR1: 'X',
      AR2: 'X',
    };

    const game = convertCsvRowToGame(row);

    expect(game).toEqual({
      date: '2022-04-02',
      time: '09:00 AM',
      homeTeam: 'Bondurant 16',
      awayTeam: 'Bondurant 9',
      field: 'Field 8-1',
      division: 'Bondurant Soccer Club',
      ageGroup: { gender: Gender.Boys, age: 7 },
      referees: [{ type: RefereeType.Center, name: 'Centy' }],
    });
  });

  test('when column names are spring 2022 U7/8 Boys game then returns correct age group', () => {
    const row = {
      Date: '4/2/2022',
      Time: '9:00 AM',
      Age: 'Bondurant Soccer Club',
      Home: 'U7/8 Girls',
      'Home Team Number': 'Bondurant 16',
      Away: 'U7/8 Girls',
      'Away Team Number': 'Bondurant 9',
      Complex: 'Bondurant West Complex',
      Field: 'Field 8-1',
      Center: 'Centy',
      AR1: 'X',
      AR2: 'X',
    };

    const game = convertCsvRowToGame(row);

    expect(game).toEqual({
      date: '2022-04-02',
      time: '09:00 AM',
      homeTeam: 'Bondurant 16',
      awayTeam: 'Bondurant 9',
      field: 'Field 8-1',
      division: 'Bondurant Soccer Club',
      ageGroup: { gender: Gender.Girls, age: 7 },
      referees: [{ type: RefereeType.Center, name: 'Centy' }],
    });
  });
});
