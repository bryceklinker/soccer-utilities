import { Gender } from '@soccer-utilities/models';
import { convertDivisionOrTeamNumberToAgeGroup } from './convert-division-or-team-number-to-age-group';

describe('convertDivisionOrTeamNumberToAgeGroup', () => {
  test('when division is "U8 Boys" then returns age: 8, gender: Boys', () => {
    const ageGroup = convertDivisionOrTeamNumberToAgeGroup('U8 Boys');

    expect(ageGroup).toEqual({ age: 8, gender: Gender.Boys });
  });

  test('when division is "U14 Girls" then returns age: 14, gender: Girls', () => {
    const ageGroup = convertDivisionOrTeamNumberToAgeGroup('U14 Girls');

    expect(ageGroup).toEqual({ age: 14, gender: Gender.Girls });
  });

  test('when division is "U10 Coed" then returns age: 10, gender: Coed', () => {
    const ageGroup = convertDivisionOrTeamNumberToAgeGroup('U10 Coed');

    expect(ageGroup).toEqual({ age: 10, gender: Gender.Coed });
  });

  test('when team number is G10A then returns age: 10, gender: Girls', () => {
    const ageGroup = convertDivisionOrTeamNumberToAgeGroup('G10A');

    expect(ageGroup).toEqual({ age: 10, gender: Gender.Girls });
  });

  test('when team number is U9A then returns age: 9, gender: Coed', () => {
    const ageGroup = convertDivisionOrTeamNumberToAgeGroup('U9A');

    expect(ageGroup).toEqual({ age: 9, gender: Gender.Coed });
  });

  test('when team number is U10B then returns age: 10, gender: Boys', () => {
    const ageGroup = convertDivisionOrTeamNumberToAgeGroup('U10B');

    expect(ageGroup).toEqual({ age: 10, gender: Gender.Boys });
  });

  test('when team number is U15G then returns age: 15, gender: Girls', () => {
    const ageGroup = convertDivisionOrTeamNumberToAgeGroup('U15G');

    expect(ageGroup).toEqual({ age: 15, gender: Gender.Girls });
  });
});
