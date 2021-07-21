import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from './convert-string-to-date';
import { format } from 'date-fns';

export enum RefereeType {
  Center = 'Center',
  Assistant = 'Assistant',
}
export const RefereeTypes = Object.values(RefereeType);

export enum Gender {
  Boys = 'Boys',
  Girls = 'Girls',
  Coed = 'Coed',
  Unknown = 'Unknown',
}
export const Genders = Object.values(Gender);

export class RefereeModel {
  @ApiProperty()
  name: string = '';

  @ApiProperty({enum: RefereeType})
  type: RefereeType = RefereeType.Center;
}

export class AgeGroupModel {
  @ApiProperty()
  age: number = 0;
  @ApiProperty({enum: Gender})
  gender: Gender = Gender.Unknown;
}

export class GameModel {
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
  ageGroup: AgeGroupModel = new AgeGroupModel();

  @ApiProperty({type: [RefereeModel]})
  referees: Array<RefereeModel> = [];
}

export class GameScheduleModel {
  @ApiPropertyOptional()
  id?: string;
  @ApiProperty({type: [GameModel]})
  games: Array<GameModel> = [];
  @ApiProperty({type: Date, format: DATE_TIME_FORMAT})
  lastUpdated: string = format(new Date(), DATE_TIME_FORMAT);
}

export class RefereeCheckModel {
  @ApiProperty({type: Date, format: DATE_FORMAT})
  date: string = format(new Date(), DATE_FORMAT);
  @ApiProperty({format: TIME_FORMAT})
  time: string = format(new Date(), TIME_FORMAT);
  @ApiProperty()
  name: string = '';
  @ApiProperty({enum: RefereeType})
  type: RefereeType = RefereeType.Center;
  @ApiProperty()
  ageGroup: AgeGroupModel = new AgeGroupModel();
  @ApiProperty()
  amount: number = 0;
}

export class ListResult<T> {
  @ApiProperty({isArray: true})
  items: Array<T> = [];
  @ApiProperty()
  count: number = 0;
}

export class RefereePayScaleModel {
  @ApiProperty({enum: RefereeType})
  refereeType: RefereeType = RefereeType.Center;
  @ApiProperty()
  ageGroup: AgeGroupModel = new AgeGroupModel();
  @ApiProperty()
  amount: number = 0;
}

export class DateRange {
  @ApiProperty({type: Date, format: DATE_FORMAT})
  start: string = format(new Date(), DATE_FORMAT);
  @ApiProperty({type: Date, format: DATE_FORMAT})
  end: string = format(new Date(), DATE_FORMAT);
}
