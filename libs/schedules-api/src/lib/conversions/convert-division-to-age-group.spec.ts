import { Gender } from '@soccer-utilities/models';
import { convertDivisionToAgeGroup } from './convert-division-to-age-group';

describe('convertDivisionToAgeGroup', () => {
  test('when division is "U8 Boys" then returns age: 8, gender: Boys', () => {
    const ageGroup = convertDivisionToAgeGroup('U8 Boys');

    expect(ageGroup).toEqual({ age: 8, gender: Gender.Boys });
  });

  test('when division is "U14 Girls" then returns age: 14, gender: Girls', () => {
    const ageGroup = convertDivisionToAgeGroup('U14 Girls');

    expect(ageGroup).toEqual({ age: 14, gender: Gender.Girls });
  });

  test('when division is "U10 Coed" then returns age: 10, gender: Coed', () => {
    const ageGroup = convertDivisionToAgeGroup('U10 Coed');

    expect(ageGroup).toEqual({ age: 10, gender: Gender.Coed });
  });
});
