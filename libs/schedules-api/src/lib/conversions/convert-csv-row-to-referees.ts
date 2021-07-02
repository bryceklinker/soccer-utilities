import { RefereeModel, RefereeType } from '@soccer-utilities/core';

const MISSING_MARKER = 'x';

export function convertCsvRowToReferees(row: any): Array<RefereeModel> {
  const center = row['Center'] === MISSING_MARKER ? null : row['Center'];
  const ar1 = row['AR1'] === MISSING_MARKER ? null : row['AR1'];
  const ar2 = row['AR2'] === MISSING_MARKER ? null : row['AR2'];

  return [
    center ? {name: center, type: RefereeType.Center} : null,
    ar1 ? {name: ar1, type: RefereeType.Assistant} : null,
    ar2 ? {name: ar2, type: RefereeType.Assistant} : null,
  ].filter(r => r);
}
