import { convertToColor, NotificationType } from './notification-model';

describe('NotificationType', () => {
  test('when undefined then returns info', () => {
    expect(convertToColor()).toEqual('info');
  })

  test('when Success converted to severity then returns success', () => {
    expect(convertToColor(NotificationType.Success)).toEqual('success');
  });

  test('when Default then returns info', () => {
    expect(convertToColor(NotificationType.Default)).toEqual('info');
  })

  test('when Error then returns error', () => {
    expect(convertToColor(NotificationType.Error)).toEqual('error');
  })
});
