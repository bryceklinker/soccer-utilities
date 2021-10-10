import { Color } from '@mui/lab';
import { NotificationType } from '@soccer-utilities/models';

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
