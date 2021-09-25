import {
  TestingRepositoryFactory,
  useTestingDataAccess,
} from '@soccer-utilities/data-access/testing';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app/app.module';
import { RepositoryFactory } from '@soccer-utilities/data-access';
import { INestApplication } from '@nestjs/common';
import { JwtGuard } from '@soccer-utilities/nest-auth0';
import { FakeJwtAuthGuard } from './fake-jwt-auth-guard';
import { UserModel } from '@soccer-utilities/models';
import { createRestApi, RestApi } from '@soccer-utilities/core';

export class ApiFixture {
  private _baseUrl: string;
  private _repositoryFactory: TestingRepositoryFactory;
  private _app: INestApplication;
  private _isStarted = false;

  get baseUrl(): string {
    this.ensureStarted();
    return this._baseUrl;
  }

  get repositoryFactory(): TestingRepositoryFactory {
    this.ensureStarted();
    return this._repositoryFactory;
  }

  async start() {
    if (this._isStarted) {
      return;
    }

    this._app = await ApiFixture.startNestApp();
    this._baseUrl = await this._app.getUrl();
    this._repositoryFactory = this._app.get(
      RepositoryFactory
    ) as TestingRepositoryFactory;
    this._isStarted = true;
  }

  async stop() {
    this.ensureStarted();
    await this._app.close();
  }

  ensureStarted() {
    if (this._isStarted) {
      return;
    }

    throw new Error('You must start the application.');
  }

  createRestApi(user: UserModel): RestApi {
    return createRestApi(this.baseUrl, JSON.stringify(user));
  }

  private static async startNestApp(): Promise<INestApplication> {
    const testingModule = await useTestingDataAccess(
      Test.createTestingModule({
        imports: [AppModule],
      })
    )
      .overrideProvider(JwtGuard)
      .useClass(FakeJwtAuthGuard)
      .compile();
    const app = testingModule.createNestApplication();
    await app.listen(0);
    return app;
  }
}
