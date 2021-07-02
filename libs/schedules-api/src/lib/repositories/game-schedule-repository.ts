import { Injectable } from '@nestjs/common';
import { Repository, RepositoryFactory } from '@soccer-utilities/data-access';
import { GameScheduleEntity } from '../entities';

@Injectable()
export class GameScheduleRepository {
  constructor(private readonly factory: RepositoryFactory) {
  }

  async getCurrent(): Promise<GameScheduleEntity | null> {
    const schedules = await this.repository().getAll();
    const schedule = schedules[0] || null;
    return schedule
      ? GameScheduleEntity.fromEntity(schedule)
      : null;
  }

  async create(entity: GameScheduleEntity): Promise<GameScheduleEntity> {
    const created = await this.repository().create(entity);
    return GameScheduleEntity.fromEntity(created);
  }

  async update(entity: GameScheduleEntity): Promise<GameScheduleEntity> {
    const updated = await this.repository().update(entity);
    return GameScheduleEntity.fromEntity(updated);
  }

  private repository(): Repository<GameScheduleEntity> {
    return this.factory.create(GameScheduleEntity);
  }
}
