import { DynamicModule, Module } from '@nestjs/common';
import {
  CosmosOptions,
  DATA_ACCESS_OPTIONS_TOKEN,
  DataAccessOptions,
} from './data-access-options';
import { CosmosClient } from '@azure/cosmos';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RepositoryFactory } from './repository-factory';

@Module({})
export class DataAccessModule {
  static forCosmos(options: DataAccessOptions): DynamicModule {
    return {
      module: DataAccessModule,
      imports: [ConfigModule],
      providers: [
        RepositoryFactory,
        { provide: DATA_ACCESS_OPTIONS_TOKEN, useValue: options },
        {
          provide: CosmosClient,
          useFactory: (config: ConfigService) => {
            const { endpoint, key } = config.get<CosmosOptions>('cosmos');
            return new CosmosClient({ endpoint, key });
          },
          inject: [ConfigService],
        },
      ],
      exports: [RepositoryFactory],
    };
  }
}
