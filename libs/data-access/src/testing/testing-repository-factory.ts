import { Entity, EntityType, Repository, RepositoryFactory } from '../lib';
import { Injectable } from '@nestjs/common';
import { TestingRepository } from './testing-repository';

@Injectable()
export class TestingRepositoryFactory extends RepositoryFactory {
  private readonly repositories: Map<EntityType<Entity>, Repository<Entity>>;

  constructor() {
    super(null, null);
    this.repositories = new Map<EntityType<Entity>, Repository<Entity>>();
  }

  create<T extends Entity>(entity: EntityType<T>): Repository<T> {
    const repository = this.repositories.get(entity);
    if (repository) {
      return repository as Repository<T>;
    }

    throw new Error(`Could not find repository for entity type ${entity}`);
  }

  setupRepository<T extends Entity>(
    entity: EntityType<T>
  ): TestingRepository<T> {
    const repository = new TestingRepository<T>();
    this.repositories.set(entity, repository);
    return repository;
  }
}
