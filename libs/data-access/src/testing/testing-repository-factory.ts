import { Entity, EntityType, Repository, RepositoryFactory } from '@soccer-utilities/data-access';
import { Injectable } from '@nestjs/common';
import { TestingRepository } from './testing-repository';

@Injectable()
export class TestingRepositoryFactory extends RepositoryFactory {
  private readonly repositories: Map<EntityType<any>, Repository<any>>;

  constructor() {
    super(null, null);
    this.repositories = new Map<EntityType<any>, Repository<any>>();
  }

  create<T extends Entity>(entity: EntityType<T>): Repository<T> {
    const repository = this.repositories.get(entity);
    if (repository) {
      return repository;
    }

    throw new Error(`Could not find repository for entity type ${entity}`);
  }

  setupRepository<T extends Entity>(entity: EntityType<T>): TestingRepository<T> {
    const repository = new TestingRepository<T>();
    this.repositories.set(entity, repository);
    return repository;
  }
}
