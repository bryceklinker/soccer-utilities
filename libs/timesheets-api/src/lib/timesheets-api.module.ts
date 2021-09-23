import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataAccessModule } from '@soccer-utilities/data-access';
import { TIMESHEETS_COMMANDS } from './commands';
import { TIMESHEET_REPOSITORIES } from './repositories';
import { TIMESHEET_QUERY_HANDLERS } from './queries';

@Module({
  imports: [
    CqrsModule,
    DataAccessModule.forCosmos({
      collection: 'entities',
      database: 'bsc',
    }),
  ],
  controllers: [],
  providers: [
    ...TIMESHEETS_COMMANDS,
    ...TIMESHEET_QUERY_HANDLERS,
    ...TIMESHEET_REPOSITORIES,
  ],
  exports: [CqrsModule],
})
export class TimesheetsApiModule {}
