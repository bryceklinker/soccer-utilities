import { convertStringDateTimeToDate, RefereeCheckModel } from '@soccer-utilities/core';
import {format} from 'date-fns';

export function refereeCheckMemo(check: RefereeCheckModel): string {
  const ageGroup = check.ageGroup;
  const date = convertStringDateTimeToDate(check.date, check.time);
  const formattedDate = format(date,'MM/dd hh:mm a');
  return `U${ageGroup.age} ${ageGroup.gender} ${formattedDate} ${check.type}`;
}
