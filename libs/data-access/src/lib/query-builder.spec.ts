import { QueryBuilder } from './query-builder';
import { TestingEntity } from '../testing';

describe('QueryBuilder', () => {
  let builder: QueryBuilder<TestingEntity>;

  beforeEach(() => {
    builder = new QueryBuilder(TestingEntity);
  });

  test('when initial query is created then only type is in where clause', () => {
    const query = builder.build();

    expect(query.text).toEqual('select * from c where c.type = @type');
    expect(query).toHaveQueryParameter({ name: 'type', value: 'testing' });
  });

  test('when where equal clause is added then where equal appears in query', () => {
    const query = builder.whereEqual('name', 'john').build();

    expect(query.text).toEqual(
      'select * from c where c.type = @type and c.name = @name'
    );
    expect(query).toHaveQueryParameter({ name: 'name', value: 'john' });
  });

  test('when where less than clause is added then where less than appears in query', () => {
    const query = builder.whereLessThan('amount', 35).build();

    expect(query.text).toEqual(
      'select * from c where c.type = @type and c.amount < @amount'
    );
    expect(query).toHaveQueryParameter({ name: 'amount', value: 35 });
  });

  test('when where greater than clause is added then where greater than appaers in query', () => {
    const query = builder.whereGreaterThan('amount', 35).build();

    expect(query.text).toEqual(
      'select * from c where c.type = @type and c.amount > @amount'
    );
    expect(query).toHaveQueryParameter({ name: 'amount', value: 35 });
  });

  test('when where less than or equal is added then where less than or equal appears in query', () => {
    const query = builder.whereLessThanOrEqual('amount', 35).build();

    expect(query.text).toEqual(
      'select * from c where c.type = @type and c.amount <= @amount'
    );
    expect(query).toHaveQueryParameter({ name: 'amount', value: 35 });
  });

  test('when where greater than or equal is added then where greater than or equal appears in query', () => {
    const query = builder.whereGreaterThanOrEqual('amount', 35).build();

    expect(query.text).toEqual(
      'select * from c where c.type = @type and c.amount >= @amount'
    );
    expect(query).toHaveQueryParameter({ name: 'amount', value: 35 });
  });

  test('when where like is added then where like appears in query', () => {
    const query = builder.whereLike('name', '%jack%').build();

    expect(query.text).toEqual(
      'select * from c where c.type = @type and c.name like @name'
    );
    expect(query).toHaveQueryParameter({ name: 'name', value: '%jack%' });
  });
});
