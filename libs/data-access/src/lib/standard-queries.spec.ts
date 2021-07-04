import { selectAllQuery } from './standard-queries';

describe('standardQueries', () => {
  test('when doing a select all then uses type as filter', () => {
    const { query, parameters } = selectAllQuery('jimbo');

    expect(query).toEqual('select * from c where c.type = @type');
    expect(parameters).toHaveLength(1);
    expect(parameters).toContainEqual({ name: '@type', value: 'jimbo' });
  });
});
