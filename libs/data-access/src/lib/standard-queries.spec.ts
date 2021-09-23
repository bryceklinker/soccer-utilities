import { selectAllQuery } from './standard-queries';
import { TestingEntity } from '../testing';
import { QueryOperator } from './query-operator';

describe('standardQueries', () => {
  test('when doing a select all then uses type as filter', () => {
    const { text, parameters } = selectAllQuery(TestingEntity);

    expect(text).toEqual('select * from c where c.type = @type');
    expect(parameters).toHaveLength(1);
    expect(parameters).toContainEqual({
      name: '@type',
      value: 'testing',
      operator: QueryOperator.Equal,
    });
  });
});
