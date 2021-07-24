import { render, screen } from '@testing-library/react';
import { NotificationBar } from './NotificationBar';
import { NotificationType } from '@soccer-utilities/models';
import userEvent from '@testing-library/user-event';
import { ModelFactory } from '@soccer-utilities/testing-support';

describe('NotificationBar', () => {
  test('when empty notifications then shows nothing', () => {
    render(<NotificationBar notifications={[]} />);

    expect(screen.queryAllByLabelText('notification')).toHaveLength(0);
  });

  test('when one notification is available then shows notification', () => {
    const notification = ModelFactory.createNotificationModel();

    render(<NotificationBar notifications={[notification]} />);

    expect(screen.getByLabelText('notification')).toHaveTextContent(
      notification.message
    );
  });

  test('when notification closed then notifies that notification was closed', () => {
    const notification = ModelFactory.createNotificationModel();
    const onCloseNotification = jest.fn();
    render(
      <NotificationBar
        notifications={[notification]}
        onCloseNotification={onCloseNotification}
      />
    );

    userEvent.click(screen.getByLabelText('notification'));

    expect(onCloseNotification).toHaveBeenCalledWith(notification);
  });

  test('when notification closes for for timeout then notifies that notification closed', () => {
    jest.useFakeTimers('modern');
    const notification = ModelFactory.createNotificationModel();
    const onCloseNotification = jest.fn();
    render(
      <NotificationBar
        notifications={[notification]}
        onCloseNotification={onCloseNotification}
      />
    );

    jest.advanceTimersByTime(5000);

    expect(onCloseNotification).toHaveBeenCalledWith(notification);
  });

  test('when success notification then shows success notification', () => {
    const notification = ModelFactory.createNotificationModel({
      type: NotificationType.Success,
    });
    render(<NotificationBar notifications={[notification]} />);

    expect(screen.getByLabelText('notification').getAttribute('class')).toMatch(
      /success/i
    );
  });
});
