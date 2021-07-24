import { FunctionComponent, useCallback } from 'react';
import { useRootDispatch, useRootSelector } from '../../state/root-hooks';
import { selectAllNotifications } from '../../notifications/state/notifications-selectors';
import { NotificationBar } from '@soccer-utilities/common-ui';
import { NotificationsActions } from '../../notifications/state/notifications-actions';
import { NotificationModel } from '@soccer-utilities/models';

export const ShellNotificationsContainer: FunctionComponent = () => {
  const notifications = useRootSelector(selectAllNotifications);
  const dispatch = useRootDispatch();
  const handleNotificationClose = useCallback(
    (notification: NotificationModel) => {
      dispatch(NotificationsActions.remove(notification));
    },
    [dispatch]
  );

  return (
    <NotificationBar
      notifications={notifications}
      onCloseNotification={handleNotificationClose}
    />
  );
};
