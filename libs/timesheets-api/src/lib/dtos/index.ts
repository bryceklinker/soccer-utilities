import {
  ISO_TIMESTAMP_FORMAT,
  TimesheetStatus,
  UserTimesheetModel,
} from '@soccer-utilities/models';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserTimesheetDto implements UserTimesheetModel {
  @ApiProperty()
  amount: number = 0;

  @ApiProperty()
  rate: number;

  @ApiProperty()
  username: string;

  @ApiProperty({ enum: TimesheetStatus })
  status: TimesheetStatus;

  @ApiPropertyOptional()
  id?: string;

  @ApiPropertyOptional()
  hours?: number;

  @ApiPropertyOptional({ type: Date, format: ISO_TIMESTAMP_FORMAT })
  timeIn?: string;

  @ApiPropertyOptional({ type: Date, format: ISO_TIMESTAMP_FORMAT })
  timeOut: string;
}
