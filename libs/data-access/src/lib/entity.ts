import { Type } from '@nestjs/common';

export interface Entity {
  id?: string;
  ttl?: number;
  type: string;
  [key: string]: any;
}

export type EntityType<T> = Type<T> & {type: string};
