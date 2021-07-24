import { ListResult } from './models';

function fromArray<T>(array: Array<T>): ListResult<T> {
  return {
    items: array,
    count: array.length,
  };
}

function fromItems<T>(...items: Array<T>): ListResult<T> {
  return fromArray<T>(items);
}

export const List = {
  fromItems,
  fromArray,
};
