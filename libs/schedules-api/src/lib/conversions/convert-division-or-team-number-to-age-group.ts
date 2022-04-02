import { AgeGroupModel, Gender } from '@soccer-utilities/models';

function getGenderFromDivision(division: string): Gender {
  const genderPart = division
    .split(' ')
    .find(
      (part) => part.includes('G') || part.includes('B') || part.includes('C')
    );

  if (genderPart.includes('G')) {
    return Gender.Girls;
  }

  if (genderPart.includes('B')) {
    return Gender.Boys;
  }

  return Gender.Coed;
}

function getGenderFromTeamNumber(teamNumber: string): Gender {
  if (teamNumber.includes('G')) {
    return Gender.Girls;
  }

  if (teamNumber.includes('B')) {
    return Gender.Boys;
  }

  return Gender.Coed;
}

function getAgeFromDivision(division: string): number {
  const agePart = division.split(' ').find((part) => part.includes('U'));

  return parseInt(agePart.replace('U', ''));
}

function getAgeFromTeamNumber(teamNumber: string): number {
  const age = teamNumber.replace(/[^\d]/g, '');
  return Number(age);
}

export function convertDivisionOrTeamNumberToAgeGroup(
  division: string
): AgeGroupModel {
  const isDivision = division.includes('U') && division.includes(' ');
  return {
    age: isDivision
      ? getAgeFromDivision(division)
      : getAgeFromTeamNumber(division),
    gender: isDivision
      ? getGenderFromDivision(division)
      : getGenderFromTeamNumber(division),
  };
}
