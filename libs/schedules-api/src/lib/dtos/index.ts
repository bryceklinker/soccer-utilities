import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  RefereeModel,
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_TIME_FORMAT,
  RefereeType,
  AgeGroupModel,
  Gender,
  GameModel,
  GameScheduleModel,
  RefereeCheckModel,
  ListResult,
  RefereePayScaleModel,
  DateRangeModel
} from '@soccer-utilities/core';
import { format } from 'date-fns';

export class RefereeDto implements RefereeModel {
  @ApiProperty()
  name: string = '';

  @ApiProperty({enum: RefereeType})
  type: RefereeType = RefereeType.Center;
}

export class AgeGroupDto implements AgeGroupModel{
  @ApiProperty()
  age: number = 0;
  @ApiProperty({enum: Gender})
  gender: Gender = Gender.Unknown;
}

export class GameDto implements GameModel{
  @ApiProperty({type: Date, format: DATE_FORMAT})
  date: string = format(new Date(), DATE_FORMAT);
  @ApiProperty({format: TIME_FORMAT})
  time: string = format(new Date(), TIME_FORMAT);
  @ApiProperty()
  homeTeam: string = '';
  @ApiProperty()
  awayTeam: string = '';
  @ApiProperty()
  field: string = '';
  @ApiProperty()
  division: string = '';

  @ApiProperty()
  ageGroup: AgeGroupModel = new AgeGroupDto();

  @ApiProperty({type: [RefereeDto]})
  referees: Array<RefereeDto> = [];
}

export class GameScheduleDto implements GameScheduleModel {
  @ApiPropertyOptional()
  id?: string;
  @ApiProperty({type: [GameDto]})
  games: Array<GameDto> = [];
  @ApiProperty({type: Date, format: DATE_TIME_FORMAT})
  lastUpdated: string = format(new Date(), DATE_TIME_FORMAT);
}

export class RefereeCheckDto implements RefereeCheckModel {
  @ApiProperty({type: Date, format: DATE_FORMAT})
  date: string = format(new Date(), DATE_FORMAT);
  @ApiProperty({format: TIME_FORMAT})
  time: string = format(new Date(), TIME_FORMAT);
  @ApiProperty()
  name: string = '';
  @ApiProperty({enum: RefereeType})
  type: RefereeType = RefereeType.Center;
  @ApiProperty()
  ageGroup: AgeGroupModel = new AgeGroupDto();
  @ApiProperty()
  amount: number = 0;
}

export class ListResultDto<T> implements ListResult<T> {
  @ApiProperty({isArray: true})
  items: Array<T> = [];
  @ApiProperty()
  count: number = 0;
}

export class RefereePayScaleDto implements RefereePayScaleModel {
  @ApiProperty({enum: RefereeType})
  refereeType: RefereeType = RefereeType.Center;
  @ApiProperty()
  ageGroup: AgeGroupModel = new AgeGroupDto();
  @ApiProperty()
  amount: number = 0;
}

export class DateRangeDto implements DateRangeModel {
  @ApiProperty({type: Date, format: DATE_FORMAT})
  start: string = format(new Date(), DATE_FORMAT);
  @ApiProperty({type: Date, format: DATE_FORMAT})
  end: string = format(new Date(), DATE_FORMAT);
}
