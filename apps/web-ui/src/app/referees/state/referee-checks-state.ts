import { EntityState } from '@reduxjs/toolkit';
import { ClientRefereeCheckModel } from '@soccer-utilities/models';

export interface RefereeChecksState
  extends EntityState<ClientRefereeCheckModel> {
  hasBeenLoaded: boolean;
}
