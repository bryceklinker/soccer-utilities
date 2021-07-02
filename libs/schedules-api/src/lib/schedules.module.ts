import { Module } from '@nestjs/common';
import { DataAccessModule } from '@soccer-utilities/data-access';
import { CqrsModule } from '@nestjs/cqrs';
import { QUERY_HANDLERS } from './queries';
import { COMMAND_HANDLERS } from './commands';

@Module({
  imports: [
    CqrsModule,
    DataAccessModule.forCosmos({
      collection: 'entities',
      database: 'bsc'
    }),
  ],
  controllers: [],
  providers: [
    ...QUERY_HANDLERS,
    ...COMMAND_HANDLERS
  ],
  exports: [],
})
export class SchedulesModule {}
