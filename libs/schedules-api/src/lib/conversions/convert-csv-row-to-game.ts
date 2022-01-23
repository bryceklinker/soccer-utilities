import { GameModel } from '@soccer-utilities/models';
import { convertDivisionToAgeGroup } from './convert-division-to-age-group';
import { convertCsvRowToReferees } from './convert-csv-row-to-referees';
import { convertCsvDateToDateString } from './convert-csv-date-to-date-string';
import { convertCsvTimeToTimeString } from './convert-csv-time-to-time-string';

const IOWA_STORM = 'Iowa Storm';

export function convertCsvRowToGame(
  row: Record<string, string>
): GameModel | null {
  const division = row['Division'];
  if (!division) {
    return null;
  }

  const homeTeam = row['Home Team'] || row['Home'];
  if (homeTeam.toLowerCase().includes(IOWA_STORM.toLowerCase())) {
    return null;
  }

  return {
    date: convertCsvDateToDateString(row['Game Date'] || row['Date']),
    time: convertCsvTimeToTimeString(row['Game Time'] || row['Time']),
    homeTeam: homeTeam,
    awayTeam: row['Away Team'] || row['Away'],
    field: row['Field'],
    division,
    ageGroup: convertDivisionToAgeGroup(division),
    referees: convertCsvRowToReferees(row),
  };
}
