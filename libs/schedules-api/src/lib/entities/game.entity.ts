import { GameModel } from '@soccer-utilities/models';
import { AgeGroupEntity } from './age-group.entity';
import { RefereeEntity } from './referee.entity';

export class GameEntity implements GameModel {
  ageGroup: AgeGroupEntity;
  awayTeam: string;
  date: string;
  division: string;
  field: string;
  homeTeam: string;
  referees: Array<RefereeEntity>;
  time: string;

  static fromModel(model: GameModel): GameEntity {
    const entity = new GameEntity();
    entity.ageGroup = AgeGroupEntity.fromModel(model.ageGroup);
    entity.date = model.date;
    entity.awayTeam = model.awayTeam;
    entity.field = model.field;
    entity.time = model.time;
    entity.division = model.division;
    entity.homeTeam = model.homeTeam;
    entity.referees = model.referees.map(RefereeEntity.fromModel);
    return entity;
  }

  toModel(): GameModel {
    return {
      ...this,
      referees: this.referees.map((r) => r.toModel()),
      ageGroup: this.ageGroup.toModel(),
    };
  }
}
