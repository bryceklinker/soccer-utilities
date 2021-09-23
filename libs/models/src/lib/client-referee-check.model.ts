import { RefereeCheckModel } from './referee-check.model';

export interface ClientRefereeCheckModel extends RefereeCheckModel {
  id: string;
  hasBeenWritten: boolean;
}
