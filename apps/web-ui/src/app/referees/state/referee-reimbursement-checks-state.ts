import { EntityState } from '@reduxjs/toolkit';
import { RefereeReimbursementCheckModel } from '@soccer-utilities/models';

export interface RefereeReimbursementChecksState
  extends EntityState<RefereeReimbursementCheckModel> {
  hasBeenLoaded: boolean;
}
