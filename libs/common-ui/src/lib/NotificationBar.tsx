import { FunctionComponent } from 'react';
import { convertToColor } from './notification-model';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { NotificationModel } from '@soccer-utilities/models';

const DEFAULT_DURATION = 4000;
const EMPTY_OPERATION = () => {};

export interface NotificationBarProps {
  notifications?: Array<NotificationModel>;
  onCloseNotification?: (notification: NotificationModel) => void;
}

export const NotificationBar: FunctionComponent<NotificationBarProps> = ({
  notifications = [],
  onCloseNotification = EMPTY_OPERATION,
}) => {
  const snackBars =
    notifications?.map((n) => (
      <Snackbar
        key={n.id}
        autoHideDuration={n.duration || DEFAULT_DURATION}
        onClose={() => onCloseNotification(n)}
        onClick={() => onCloseNotification(n)}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        open={true}
      >
        <Alert
          onClose={() => onCloseNotification(n)}
          aria-label={'notification'}
          severity={convertToColor(n.type)}
        >
          {n.message}
        </Alert>
      </Snackbar>
    )) || [];

  return <div>{snackBars}</div>;
};
