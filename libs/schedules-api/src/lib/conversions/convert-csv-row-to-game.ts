import { GameModel } from '@soccer-utilities/models';
import { convertDivisionToAgeGroup } from './convert-division-to-age-group';
import { convertCsvRowToReferees } from './convert-csv-row-to-referees';
import { convertCsvDateToDateString } from './convert-csv-date-to-date-string';
import { convertCsvTimeToTimeString } from './convert-csv-time-to-time-string';

export function convertCsvRowToGame(
  row: Record<string, string>
): GameModel | null {
  const division = row['Division'];
  if (!division) {
    return null;
  }
  return {
    date: convertCsvDateToDateString(row['Game Date']),
    time: convertCsvTimeToTimeString(row['Game Time']),
    homeTeam: row['Home Team'],
    awayTeam: row['Away Team'],
    field: row['Field'],
    division,
    ageGroup: convertDivisionToAgeGroup(division),
    referees: convertCsvRowToReferees(row),
  };
}
