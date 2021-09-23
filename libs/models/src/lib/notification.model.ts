import { NotificationType } from './notification-type';

export interface NotificationModel {
  id: string;
  message: string;
  duration?: number;
  type?: NotificationType;
}
