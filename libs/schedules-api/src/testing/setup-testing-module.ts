import { Test } from '@nestjs/testing';
import { SchedulesModule } from '@soccer-utilities/schedules-api';
import { useTestingDataAccess, TestingDataAccessModule } from '@soccer-utilities/data-access/testing';

export async function setupTestingModule() {
  try {
    const builder = useTestingDataAccess(
      Test.createTestingModule({imports: [SchedulesModule, TestingDataAccessModule]})
    );
    const app = await builder.compile();
    return await app.init();
  } catch (err) {
    throw err;
  }
}
