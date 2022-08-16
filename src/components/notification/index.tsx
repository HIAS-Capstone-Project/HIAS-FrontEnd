import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const openNotificationWithIcon = (
  type: NotificationType,
  title: string,
  description: string,
  placement?: NotificationPlacement,
) => {
  notification[type]({
    message: title,
    description,
    placement,
  });
};
