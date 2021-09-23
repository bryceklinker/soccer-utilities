import { printReceived, printExpected } from 'jest-matcher-utils';
import { QueryParameter, RepositoryQuery } from '../lib';

expect.extend({
  toHaveQueryParameter(
    actual: RepositoryQuery,
    expected: Omit<QueryParameter, 'operator'>
  ) {
    const expectedParameter = { ...expected, name: `@${expected.name}` };
    const hasParameter = actual.parameters.some(
      (p) =>
        p.value === expectedParameter.value && p.name === expectedParameter.name
    );
    return {
      pass: hasParameter,
      message: () => {
        return `Expected query parameters ${printReceived(
          actual.parameters
        )} to contain parameter ${printExpected(expectedParameter)}`;
      },
    };
  },
});
