import { Test, TestingModule } from '@nestjs/testing';
import { DataAccessModule, RepositoryFactory } from '@soccer-utilities/data-access';
import { ConfigModule } from '@nestjs/config';
import { TestingEntity } from '../testing';
import { CosmosRepository } from './cosmos-repository';

describe('DataAccessModule', () => {
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [
            () => ({cosmos: {endpoint: 'https://accountname.documents.azure.com:443/', key: ''}})
          ]
        }),
        DataAccessModule.forCosmos({database: 'bsc', collection: 'entities'})
      ]
    }).compile();
  })

  test('when imported then can create repositories', () => {
    const repository = testingModule.get(RepositoryFactory).create(TestingEntity);

    expect(repository).toBeInstanceOf(CosmosRepository);
  })
})
