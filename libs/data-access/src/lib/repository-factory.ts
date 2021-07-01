import { Inject, Injectable } from '@nestjs/common';
import { Repository } from './repository';
import { CosmosClient } from '@azure/cosmos';
import { DATA_ACCESS_OPTIONS_TOKEN, DataAccessOptions } from './data-access-options';
import { CosmosRepository } from './cosmos-repository';
import { EntityType } from './entity';

@Injectable()
export class RepositoryFactory {
  constructor(private readonly client: CosmosClient,
              @Inject(DATA_ACCESS_OPTIONS_TOKEN) private readonly options: DataAccessOptions) {
  }

  create<T>(entity: EntityType<T>): Repository<T> {
    return new CosmosRepository<T>(this.client, this.options, entity);
  }
}
