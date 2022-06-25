import * as moment from 'moment';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

export const RangeDates = (from: Date | string, to: Date | string) => {
  const dateFrom = moment(from);
  const dateTo = moment(to);
  dateFrom.subtract(1, 'days');
  dateTo.add(1, 'days');
  return Between(dateFrom.toISOString(), dateTo.toISOString());
};

export const FromDate = (value: Date | string) => {
  const date = moment(value);
  return MoreThanOrEqual(date.toISOString());
};

export const ToDate = (value: Date | string) => {
  const date = moment(value);
  return LessThanOrEqual(date.toISOString());
};
