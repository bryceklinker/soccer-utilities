import { Test } from '@nestjs/testing';
import { SchedulesModule } from '../lib';
import {
  useTestingDataAccess,
  TestingDataAccessModule,
} from '@soccer-utilities/data-access/testing';

export async function setupTestingModule() {
  const builder = useTestingDataAccess(
    Test.createTestingModule({
      imports: [SchedulesModule, TestingDataAccessModule],
    })
  );
  const app = await builder.compile();
  return await app.init();
}
