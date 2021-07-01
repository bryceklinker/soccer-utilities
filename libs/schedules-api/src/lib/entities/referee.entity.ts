import { RefereeModel, RefereeType } from '@soccer-utilities/core';

export class RefereeEntity implements RefereeModel {
  name: string;
  type: RefereeType;

  static fromModel(model: RefereeModel): RefereeEntity {
    const entity = new RefereeEntity();
    entity.type = model.type;
    entity.name = model.name;
    return entity;
  }
}
