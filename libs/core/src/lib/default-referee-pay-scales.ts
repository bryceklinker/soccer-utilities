import { Gender, RefereePayScaleModel, RefereeType } from './models';

export const DEFAULT_REFEREE_PAY_SCALES: Array<RefereePayScaleModel> = [
  {refereeType: RefereeType.Center, amount: 15, ageGroup: {age: 8, gender: Gender.Unknown}},
  {refereeType: RefereeType.Center, amount: 20, ageGroup: {age: 10, gender: Gender.Unknown}},
  {refereeType: RefereeType.Center, amount: 30, ageGroup: {age: 12, gender: Gender.Unknown}},
  {refereeType: RefereeType.Center, amount: 40, ageGroup: {age: 14, gender: Gender.Unknown}},
  {refereeType: RefereeType.Center, amount: 45, ageGroup: {age: 16, gender: Gender.Unknown}},
  {refereeType: RefereeType.Center, amount: 50, ageGroup: {age: 19, gender: Gender.Unknown}},

  {refereeType: RefereeType.Assistant, amount: 15, ageGroup: {age: 10, gender: Gender.Unknown}},
  {refereeType: RefereeType.Assistant, amount: 20, ageGroup: {age: 12, gender: Gender.Unknown}},
  {refereeType: RefereeType.Assistant, amount: 25, ageGroup: {age: 14, gender: Gender.Unknown}},
  {refereeType: RefereeType.Assistant, amount: 30, ageGroup: {age: 16, gender: Gender.Unknown}},
  {refereeType: RefereeType.Assistant, amount: 35, ageGroup: {age: 19, gender: Gender.Unknown}}
]
