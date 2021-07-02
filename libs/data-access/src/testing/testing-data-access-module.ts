import { Module } from "@nestjs/common";
import { DATA_ACCESS_OPTIONS_TOKEN, RepositoryFactory } from '../lib';
import { TestingRepositoryFactory } from './testing-repository-factory';
import { CosmosClient } from '@azure/cosmos';
import { ConfigModule } from '@nestjs/config';
import { TestingModuleBuilder } from '@nestjs/testing';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        () => ({cosmos: {endpoint: 'https://accountname.documents.azure.com:443/', key: ''}})
      ]
    }),
  ],
  providers: [
    {provide: DATA_ACCESS_OPTIONS_TOKEN, useValue: {}},
    {provide: CosmosClient, useValue: null}
  ]
})
export class TestingDataAccessModule {

}

export function useTestingDataAccess(builder: TestingModuleBuilder): TestingModuleBuilder {
  return builder
    .overrideProvider(RepositoryFactory).useClass(TestingRepositoryFactory);
}
