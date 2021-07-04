import { SqlQuerySpec } from '@azure/cosmos';

export function selectAllQuery(type: string): SqlQuerySpec {
  return {
    query: 'select * from c where c.type = @type',
    parameters: [
      {name: '@type', value: type}
    ]
  }
}
