import { QueryParameter } from '../lib';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveQueryParameter(expected: Omit<QueryParameter, 'operator'>): R;
    }
  }
}
