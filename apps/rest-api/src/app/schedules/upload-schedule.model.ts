import { ApiProperty } from '@nestjs/swagger';

export class UploadScheduleModel {
  @ApiProperty({ type: 'string', format: 'binary' })
  scheduleFile: unknown;
}
