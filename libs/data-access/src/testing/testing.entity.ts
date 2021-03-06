import { Entity } from '../lib';

export class TestingEntity implements Entity {
  static type = 'testing';
  readonly type = 'testing';
  id?: string;
  name?: string;
  amount?: number;

  constructor(id?: string, name?: string) {
    this.id = id;
    this.name = name;
  }
}
