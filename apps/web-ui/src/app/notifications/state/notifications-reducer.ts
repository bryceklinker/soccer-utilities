import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { NotificationsState } from './notifications-state';
import { NotificationModel } from '@soccer-utilities/common-ui';
import { NotificationsActions } from './notifications-actions';

const adapter = createEntityAdapter<NotificationModel>();
export const notificationsReducer = createReducer<NotificationsState>(adapter.getInitialState(), builder => builder
  .addCase(NotificationsActions.publish, (state, {payload}) => adapter.addOne(state, payload))
  .addCase(NotificationsActions.remove, (state, {payload}) => adapter.removeOne(state, payload.id))
);

export const notificationsSelectors = adapter.getSelectors();
