import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from './convert-string-to-date';

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
  name: string;

  @ApiProperty({enum: RefereeType})
  type: RefereeType;
}

export class AgeGroupModel {
  @ApiProperty()
  age: number;
  @ApiProperty({enum: Gender})
  gender: Gender;
}

export class GameModel {
  @ApiProperty({type: Date, format: DATE_FORMAT})
  date: string;
  @ApiProperty({format: TIME_FORMAT})
  time: string;
  @ApiProperty()
  homeTeam: string;
  @ApiProperty()
  awayTeam: string;
  @ApiProperty()
  field: string;
  @ApiProperty()
  division: string;

  @ApiProperty()
  ageGroup: AgeGroupModel;

  @ApiProperty({type: [RefereeModel]})
  referees: Array<RefereeModel>;
}

export class GameScheduleModel {
  @ApiPropertyOptional()
  id?: string;
  @ApiProperty({type: [GameModel]})
  games: Array<GameModel>;
  @ApiProperty({type: Date, format: DATE_TIME_FORMAT})
  lastUpdated: string;
}

export class RefereeCheckModel {
  @ApiProperty({type: Date, format: DATE_FORMAT})
  date: string;
  @ApiProperty({format: TIME_FORMAT})
  time: string;
  @ApiProperty()
  name: string;
  @ApiProperty({enum: RefereeType})
  type: RefereeType;
  @ApiProperty()
  ageGroup: AgeGroupModel;
  @ApiProperty()
  amount: number;
}

export class ListResult<T> {
  @ApiProperty({isArray: true})
  items: Array<T>;
  @ApiProperty()
  count: number;
}

export class RefereePayScaleModel {
  @ApiProperty({enum: RefereeType})
  refereeType: RefereeType;
  @ApiProperty()
  ageGroup: AgeGroupModel;
  @ApiProperty()
  amount: number;
}

export interface DateRange {
  start: string;
  end: string;
}
