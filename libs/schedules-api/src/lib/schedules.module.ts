import { Module } from '@nestjs/common';
import { DataAccessModule } from '@soccer-utilities/data-access';

@Module({
  imports: [
    DataAccessModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class SchedulesModule {}
