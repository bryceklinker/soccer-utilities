import { GameModel } from '@soccer-utilities/models';
import { convertDivisionOrTeamNumberToAgeGroup } from './convert-division-or-team-number-to-age-group';
import { convertCsvRowToReferees } from './convert-csv-row-to-referees';
import { convertCsvDateToDateString } from './convert-csv-date-to-date-string';
import { convertCsvTimeToTimeString } from './convert-csv-time-to-time-string';

const IOWA_STORM = 'Iowa Storm';

export type CsvRow = Record<string, string>;

export function convertCsvRowToGame(row: CsvRow): GameModel | null {
  const divisionOrTeamNumber = getValueByKeys(
    row,
    'Division',
    'Home Team Number'
  );
  if (!divisionOrTeamNumber) {
    return null;
  }

  const homeTeam = getValueByKeys(row, 'Home Team', 'Home');
  if (!homeTeam || homeTeam.toLowerCase().includes(IOWA_STORM.toLowerCase())) {
    return null;
  }

  const date = getValueByKeys(row, 'Game Date', 'Date');
  const time = getValueByKeys(row, 'Game Time', 'Time');
  const division = getValueByKeys(row, 'Division', 'Age');
  return {
    date: convertCsvDateToDateString(date),
    time: convertCsvTimeToTimeString(time),
    homeTeam,
    awayTeam: getValueByKeys(row, 'Away Team', 'Away'),
    field: getValueByKeys(row, 'Field'),
    division,
    ageGroup: convertDivisionOrTeamNumberToAgeGroup(divisionOrTeamNumber),
    referees: convertCsvRowToReferees(row),
  };
}

function getValueByKeys(row: CsvRow, ...keys: Array<string>): string | null {
  for (const key of keys) {
    if (row[key]) {
      return row[key];
    }
  }
  return null;
}
