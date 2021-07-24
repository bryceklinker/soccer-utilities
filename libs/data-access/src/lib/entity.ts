import { Type } from '@nestjs/common';

export interface Entity {
  id?: string;
  ttl?: number;
  type: string;
}

export type EntityType<T> = Type<T> & { type: string };
