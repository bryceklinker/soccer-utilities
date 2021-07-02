import { AgeGroupModel, Gender } from '@soccer-utilities/core';

function getGenderFromDivision(division: string): Gender {
  const genderPart = division.split(' ')
    .find(part => part.includes('G') || part.includes('B') || part.includes('C'));

  if (genderPart.includes('G')) {
    return Gender.Girls;
  }

  if (genderPart.includes('B')) {
    return Gender.Boys;
  }

  return Gender.Coed;
}

function getAgeFromDivision(division: string): number {
  const agePart = division.split(' ')
    .find(part => part.includes('U'));

  return parseInt(agePart.replace('U', ''));
}

export function convertDivisionToAgeGroup(division: string): AgeGroupModel {
  return {
    age: getAgeFromDivision(division),
    gender: getGenderFromDivision(division)
  }
}
