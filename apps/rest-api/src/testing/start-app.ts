import { Test } from '@nestjs/testing';
import { useTestingDataAccess } from '@soccer-utilities/data-access/testing';
import { AppModule } from '../app/app.module';

export async function startApp() {
  const testingModule = await useTestingDataAccess(
    Test.createTestingModule({
      imports: [AppModule],
    })
  ).compile();
  const app = testingModule.createNestApplication();
  await app.listen(0);
  return app;
}
