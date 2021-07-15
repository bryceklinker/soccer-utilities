import { createAction } from '@reduxjs/toolkit';
import { NotificationModel } from '@soccer-utilities/common-ui';

export const NotificationsActions = {
  publish: createAction('[Notifications] Publish', (notification: NotificationModel) => ({ payload: notification })),
  remove: createAction('[Notifications] Remove', (notification: NotificationModel) => ({payload: notification}))
};
