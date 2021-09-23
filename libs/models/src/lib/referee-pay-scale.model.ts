import { RefereeType } from './referee-type';
import { AgeGroupModel } from './age-group.model';

export interface RefereePayScaleModel {
  refereeType: RefereeType;
  ageGroup: AgeGroupModel;
  amount: number;
}
