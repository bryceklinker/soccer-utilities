import { RootState } from '../../state/root-state';
import { NotificationsState } from './notifications-state';
import { createSelector } from '@reduxjs/toolkit';
import { notificationsSelectors } from './notifications-reducer';

function selectNotificationsState(state: RootState): NotificationsState {
  return state.notifications;
}

export const selectAllNotifications = createSelector(
  selectNotificationsState,
  notificationsSelectors.selectAll
);
