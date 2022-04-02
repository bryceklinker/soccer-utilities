import { Test } from '@nestjs/testing';
import { SchedulesModule } from '../lib';
import {
  useTestingDataAccess,
  TestingDataAccessModule,
} from '@soccer-utilities/data-access/testing';
import { TestingLogger } from '@nestjs/testing/services/testing-logger.service';
import { Logger } from '@nestjs/common';

export async function setupTestingModule() {
  const builder = useTestingDataAccess(
    Test.createTestingModule({
      imports: [SchedulesModule, TestingDataAccessModule],
      providers: [{ provide: Logger, useClass: TestingLogger }],
    })
  );
  const app = await builder.compile();
  return await app.init();
}
