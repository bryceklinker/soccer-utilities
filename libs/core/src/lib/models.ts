export enum RefereeType {
  Center = 'Center',
  Assistant = 'Assistant',
}
export const RefereeTypes = Object.values(RefereeType);

export enum Gender {
  Boys = 'Boys',
  Girls = 'Girls',
  Coed = 'Coed',
  Unknown = 'Unknown',
}
export const Genders = Object.values(Gender);

export interface RefereeModel {
  name: string;
  type: RefereeType;
}

export interface AgeGroup {
  age: number;
  gender: Gender;
}

export interface GameModel {
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  field: string;
  division: string;
  ageGroup: AgeGroup;
  referees: Array<RefereeModel>;
}

export interface GameScheduleModel {
  games: Array<GameModel>;
  lastUpdated: string;
}
