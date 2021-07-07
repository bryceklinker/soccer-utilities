import { RefereeModel, RefereeType } from '@soccer-utilities/core';

const MISSING_REFEREE_MARKERS = [
  'X',
  'x'
]

function getRefereeFromValue(value: string): string | null {
  if (MISSING_REFEREE_MARKERS.includes(value)) {
    return null;
  }

  return value;
}

export function convertCsvRowToReferees(row: any): Array<RefereeModel> {
  const center = getRefereeFromValue(row['Center']);
  const ar1 = getRefereeFromValue(row['AR1']);
  const ar2 = getRefereeFromValue(row['AR2']);

  return [
    center ? { name: center, type: RefereeType.Center } : null,
    ar1 ? { name: ar1, type: RefereeType.Assistant } : null,
    ar2 ? { name: ar2, type: RefereeType.Assistant } : null
  ].filter(r => r);
}
