import { RefereeCheckModel } from '@soccer-utilities/core';

export interface ClientRefereeCheckModel extends RefereeCheckModel {
  id: string;
  hasBeenWritten: boolean;
}
