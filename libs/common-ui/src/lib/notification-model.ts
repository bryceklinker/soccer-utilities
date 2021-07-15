import { Color } from '@material-ui/lab';

export enum NotificationType {
  Error = 'Error',
  Success = 'Success',
  Default = 'Default'
}

export interface NotificationModel {
  id: string;
  message: string;
  duration?: number;
  type?: NotificationType
}

export function convertToColor(type?: NotificationType): Color {
  switch (type) {
    case NotificationType.Success:
      return 'success';

    case NotificationType.Error:
      return 'error';

    default:
      return 'info';
  }
}
