import { Entity } from '@soccer-utilities/data-access';

export class TestingEntity implements Entity {
  static type = 'testing';
  type = 'testing';
  id?: string;

  constructor(id?: string) {
    this.id = id;
  }
}
