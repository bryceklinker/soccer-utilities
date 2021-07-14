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

export interface AgeGroupModel {
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
  ageGroup: AgeGroupModel;
  referees: Array<RefereeModel>;
}

export interface GameScheduleModel {
  id?: string;
  games: Array<GameModel>;
  lastUpdated: string;
}

export interface RefereeCheckModel {
  date: string;
  time: string;
  name: string;
  type: RefereeType;
  ageGroup: AgeGroupModel;
  amount: number;
}

export interface ListResult<T> {
  items: Array<T>;
  count: number;
}

export interface RefereePayScaleModel {
  refereeType: RefereeType;
  ageGroup: AgeGroupModel;
  amount: number;
}

export interface DateRange {
  start: string;
  end: string;
}
