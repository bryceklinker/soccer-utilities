import { RefereeType } from './referee-type';
import { AgeGroupModel } from './age-group.model';

export interface RefereeCheckModel {
  date: string;
  time: string;
  name: string;
  type: RefereeType;
  ageGroup: AgeGroupModel;
  amount: number;
}
