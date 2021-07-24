import { convertCsvRowToReferees } from './convert-csv-row-to-referees';
import { RefereeType } from '@soccer-utilities/models';

describe('convertCsvRowToReferees', () => {
  test('when row only has center then returns center referee only', () => {
    const row = { Center: 'Bill', AR1: 'x', AR2: 'x' };

    const referees = convertCsvRowToReferees(row);

    expect(referees).toHaveLength(1);
    expect(referees).toContainEqual({ name: 'Bill', type: RefereeType.Center });
  });

  test('when row has AR1 only then returns one assistant only', () => {
    const row = { Center: 'x', AR1: 'Jimmy', AR2: 'x' };

    const referees = convertCsvRowToReferees(row);

    expect(referees).toHaveLength(1);
    expect(referees).toContainEqual({
      name: 'Jimmy',
      type: RefereeType.Assistant,
    });
  });

  test('when row has AR2 only then returns one assistant only', () => {
    const row = { Center: 'x', AR1: 'x', AR2: 'Sue' };

    const referees = convertCsvRowToReferees(row);

    expect(referees).toHaveLength(1);
    expect(referees).toContainEqual({
      name: 'Sue',
      type: RefereeType.Assistant,
    });
  });

  test('when row has all three referees then returns all referees', () => {
    const row = { Center: 'Jan', AR1: 'Jill', AR2: 'Sue' };

    const referees = convertCsvRowToReferees(row);

    expect(referees).toHaveLength(3);
    expect(referees).toContainEqual({ name: 'Jan', type: RefereeType.Center });
    expect(referees).toContainEqual({
      name: 'Jill',
      type: RefereeType.Assistant,
    });
    expect(referees).toContainEqual({
      name: 'Sue',
      type: RefereeType.Assistant,
    });
  });

  test('when row has "X" for referee then referee is ignored', () => {
    const row = { Center: 'Mark', AR1: 'X', AR2: 'Sue' };

    const referees = convertCsvRowToReferees(row);

    expect(referees).toHaveLength(2);
  });
});
