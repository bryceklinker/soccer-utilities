import { AgeGroupModel } from './age-group.model';
import { RefereeModel } from './referee.model';

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
