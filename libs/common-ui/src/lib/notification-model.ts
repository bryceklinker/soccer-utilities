import { NotificationType } from '@soccer-utilities/models';
import { AlertColor } from '@mui/material';

export function convertToColor(type?: NotificationType): AlertColor {
  switch (type) {
    case NotificationType.Success:
      return 'success';

    case NotificationType.Error:
      return 'error';

    default:
      return 'info';
  }
}
