import { Test } from '@nestjs/testing';
import { SchedulesModule } from '@soccer-utilities/schedules-api';
import { overrideProviders } from '@soccer-utilities/data-access/testing';

export async function setupTestingModule() {
  try {
    return await overrideProviders(
      Test.createTestingModule({
        imports: [SchedulesModule],
      })
    ).compile();
  } catch (err) {
    throw err;
  }
}
