import { Entity } from '@soccer-utilities/data-access';

export class TestingEntity implements Entity {
  static type = 'testing';
  readonly type = 'testing';
  id?: string;
  name?: string;

  constructor(id?: string, name?: string) {
    this.id = id;
    this.name = name;
  }
}
