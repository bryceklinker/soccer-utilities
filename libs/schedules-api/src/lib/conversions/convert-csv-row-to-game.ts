import { GameModel } from '@soccer-utilities/core';
import { convertDivisionToAgeGroup } from './convert-division-to-age-group';
import { convertCsvRowToReferees } from './convert-csv-row-to-referees';

export function convertCsvRowToGame(row: any): GameModel | null {
  const division = row['Division'];
  if (!division) {
    return null;
  }
  return {
    awayTeam: row['Away Team'],
    date: row['Game Date'],
    division,
    field: row['Field'],
    homeTeam: row['Home Team'],
    time: row['Game Time'],
    ageGroup: convertDivisionToAgeGroup(division),
    referees: convertCsvRowToReferees(row)
  };
}
