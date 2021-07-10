import { EntityState } from '@reduxjs/toolkit';
import { ClientRefereeCheckModel } from '@soccer-utilities/schedules-ui';

export interface RefereeChecksState extends EntityState<ClientRefereeCheckModel> {
  hasBeenLoaded: boolean;
}
