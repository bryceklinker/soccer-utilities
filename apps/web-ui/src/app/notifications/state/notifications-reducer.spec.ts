import { generateStateFromActions } from '../../../testing';
import { notificationsReducer } from './notifications-reducer';
import { NotificationsActions } from './notifications-actions';
import { ModelFactory } from '@soccer-utilities/testing-support';

describe('notificationsReducer', () => {
  test('when notification published then notification is added to state', () => {
    const notification = ModelFactory.createNotificationModel();

    const state = generateStateFromActions(
      notificationsReducer,
      NotificationsActions.publish(notification)
    );

    expect(state.entities[notification.id]).toEqual(notification);
  });

  test('when notification removed then notification is removed from state', () => {
    const notification = ModelFactory.createNotificationModel();

    const state = generateStateFromActions(
      notificationsReducer,
      NotificationsActions.publish(notification),
      NotificationsActions.remove(notification)
    );

    expect(state.ids).toHaveLength(0);
    expect(state.entities).toEqual({});
  });
});
