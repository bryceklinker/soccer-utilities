import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { format } from 'date-fns';
import {
  AgeGroupModel,
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  DateRangeModel,
  GameModel,
  GameScheduleModel,
  Gender,
  ListResult,
  RefereeCheckModel,
  RefereeModel,
  RefereePayScaleModel,
  RefereeType,
  TIME_FORMAT
} from '@soccer-utilities/models';

export class RefereeDto implements RefereeModel {
  @ApiProperty()
  name = '';

  @ApiProperty({ enum: RefereeType })
  type: RefereeType = RefereeType.Center;
}

export class AgeGroupDto implements AgeGroupModel {
  @ApiProperty()
  age = 0;
  @ApiProperty({ enum: Gender })
  gender: Gender = Gender.Unknown;
}

export class GameDto implements GameModel {
  @ApiProperty({ type: Date, format: DATE_FORMAT })
  date: string = format(new Date(), DATE_FORMAT);
  @ApiProperty({ format: TIME_FORMAT })
  time: string = format(new Date(), TIME_FORMAT);
  @ApiProperty()
  homeTeam = '';
  @ApiProperty()
  awayTeam = '';
  @ApiProperty()
  field = '';
  @ApiProperty()
  division = '';

  @ApiProperty({ type: AgeGroupDto })
  ageGroup: AgeGroupModel = new AgeGroupDto();

  @ApiProperty({ type: [RefereeDto] })
  referees: Array<RefereeDto> = [];
}

export class GameScheduleDto implements GameScheduleModel {
  @ApiPropertyOptional()
  id?: string;
  @ApiProperty({ type: [GameDto] })
  games: Array<GameDto> = [];
  @ApiProperty({ type: Date, format: DATE_TIME_FORMAT })
  lastUpdated: string = format(new Date(), DATE_TIME_FORMAT);
}

export class RefereeCheckDto implements RefereeCheckModel {
  @ApiProperty({ type: Date, format: DATE_FORMAT })
  date: string = format(new Date(), DATE_FORMAT);
  @ApiProperty({ format: TIME_FORMAT })
  time: string = format(new Date(), TIME_FORMAT);
  @ApiProperty()
  name = '';
  @ApiProperty({ enum: RefereeType })
  type: RefereeType = RefereeType.Center;
  @ApiProperty({ type: AgeGroupDto })
  ageGroup: AgeGroupModel = new AgeGroupDto();
  @ApiProperty()
  amount = 0;
}

export class ListResultDto<T> implements ListResult<T> {
  @ApiProperty({ isArray: true })
  items: Array<T> = [];
  @ApiProperty()
  count = 0;
}

export class RefereePayScaleDto implements RefereePayScaleModel {
  @ApiProperty({ enum: RefereeType })
  refereeType: RefereeType = RefereeType.Center;
  @ApiProperty({ type: AgeGroupDto })
  ageGroup: AgeGroupModel = new AgeGroupDto();
  @ApiProperty()
  amount = 0;
}

export class DateRangeDto implements DateRangeModel {
  @ApiProperty({ type: Date, format: DATE_FORMAT })
  start: string = format(new Date(), DATE_FORMAT);
  @ApiProperty({ type: Date, format: DATE_FORMAT })
  end: string = format(new Date(), DATE_FORMAT);
}
