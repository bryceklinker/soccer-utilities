import { AgeGroupModel, Gender } from '@soccer-utilities/core';

export class AgeGroupEntity implements AgeGroupModel {
  age: number;
  gender: Gender;

  static fromModel(model: AgeGroupModel): AgeGroupEntity {
      const entity = new AgeGroupEntity();
      entity.age = model.age;
      entity.gender = model.gender;
      return entity;
  }
}
