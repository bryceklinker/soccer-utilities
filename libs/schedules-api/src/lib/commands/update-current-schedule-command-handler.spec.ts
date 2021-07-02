import { CommandBus } from '@nestjs/cqrs';
import { TestingRepository, TestingRepositoryFactory } from '@soccer-utilities/data-access/testing';
import { GameScheduleEntity } from '../entities';
import { setupTestingModule } from '../../testing';
import { RepositoryFactory } from '@soccer-utilities/data-access';
import { UpdateCurrentScheduleCommand } from '@soccer-utilities/schedules-api';
import { readSampleGameSchedule } from '@soccer-utilities/testing-support';
import { ModelFactory } from '@soccer-utilities/core/testing';

describe('UpdateCurrentScheduleCommandHandler', () => {
  let commandBus: CommandBus;
  let repository: TestingRepository<GameScheduleEntity>;

  beforeEach(async () => {
    const app = await setupTestingModule();

    const factory = app.get(RepositoryFactory) as TestingRepositoryFactory;
    repository = factory.setupRepository(GameScheduleEntity);
    commandBus = app.get(CommandBus);
  });

  test('when current schedule is missing then creates current schedule', async () => {
    const command = new UpdateCurrentScheduleCommand(readSampleGameSchedule());

    const currentScheduleId = await commandBus.execute(command);

    expect(currentScheduleId).toBeDefined();
    expect(await repository.getAll()).toHaveLength(1);
  });

  test('when current schedule exists then updates current schedule', async () => {
    const {id} = await repository.create(GameScheduleEntity.fromModel(ModelFactory.createGameSchedule()));

    const command = new UpdateCurrentScheduleCommand(readSampleGameSchedule());
    const scheduleId = await commandBus.execute(command);

    expect(scheduleId).toEqual(id);
    expect(await repository.getAll()).toHaveLength(1);
  })
});
