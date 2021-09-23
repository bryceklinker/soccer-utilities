import { Injectable } from '@nestjs/common';
import {
  QueryBuilder,
  Repository,
  RepositoryFactory,
} from '@soccer-utilities/data-access';
import { UserTimesheetEntity } from '../entities/user-timesheet.entity';
import { TimesheetStatus } from '@soccer-utilities/models';

@Injectable()
export class UserTimesheetRepository {
  constructor(private readonly factory: RepositoryFactory) {}

  async add(entity: UserTimesheetEntity): Promise<void> {
    const repository = this.repository();
    await repository.create(entity);
  }

  async getOpenTimesheet(
    username: string
  ): Promise<UserTimesheetEntity | null> {
    const query = new QueryBuilder(UserTimesheetEntity)
      .whereEqual('username', username)
      .whereEqual('status', TimesheetStatus.Incomplete)
      .build();
    const results = await this.repository().query(query);
    return results.length === 0
      ? null
      : UserTimesheetEntity.fromEntity(results[0]);
  }

  async update(timesheet: UserTimesheetEntity): Promise<UserTimesheetEntity> {
    return UserTimesheetEntity.fromEntity(
      await this.repository().update(timesheet)
    );
  }

  async getById(id: string): Promise<UserTimesheetEntity | null> {
    const timesheet = await this.repository().getById(id);
    return timesheet ? UserTimesheetEntity.fromEntity(timesheet) : null;
  }

  private repository(): Repository<UserTimesheetEntity> {
    return this.factory.create(UserTimesheetEntity);
  }
}
