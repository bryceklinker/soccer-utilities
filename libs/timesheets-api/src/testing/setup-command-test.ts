import { setupTestingModule } from './setup-testing-module';
import { RepositoryFactory } from '@soccer-utilities/data-access';
import {
  TestingRepository,
  TestingRepositoryFactory,
} from '@soccer-utilities/data-access/testing';
import { UserTimesheetEntity } from '../lib/entities';
import { CommandBus } from '@nestjs/cqrs';

export interface SetupCommandTestResult {
  repository: TestingRepository<UserTimesheetEntity>;
  commandBus: CommandBus;
}

export async function setupCommandTest(): Promise<SetupCommandTestResult> {
  const app = await setupTestingModule();

  const repositoryFactory = app.get(
    RepositoryFactory
  ) as TestingRepositoryFactory;
  const repository = repositoryFactory.setupRepository(UserTimesheetEntity);
  const commandBus = app.get(CommandBus);
  return { repository, commandBus };
}
