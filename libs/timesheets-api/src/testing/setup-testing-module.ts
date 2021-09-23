import {
  TestingDataAccessModule,
  useTestingDataAccess,
} from '@soccer-utilities/data-access/testing';
import { Test } from '@nestjs/testing';
import { TimesheetsApiModule } from '../lib/timesheets-api.module';

export async function setupTestingModule() {
  const builder = useTestingDataAccess(
    Test.createTestingModule({
      imports: [TimesheetsApiModule, TestingDataAccessModule],
    })
  );

  const app = await builder.compile();
  return await app.init();
}
