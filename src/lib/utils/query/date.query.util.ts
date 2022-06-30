import * as moment from 'moment';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

export const RangeDates = (from: Date | string, to: Date | string) => {
  const dateFrom = moment(from, 'YYYY-MM-DD', true).isValid()
    ? moment(from).startOf('day')
    : moment(from);
  const dateTo = moment(to, 'YYYY-MM-DD', true).isValid()
    ? moment(to).endOf('day')
    : moment(to);
  return Between(dateFrom.toISOString(), dateTo.toISOString());
};

export const FromDate = (value: Date | string) => {
  const date = moment(value, 'YYYY-MM-DD', true).isValid()
    ? moment(value).startOf('day')
    : moment(value);
  return MoreThanOrEqual(date.toISOString());
};

export const ToDate = (value: Date | string) => {
  const date = moment(value, 'YYYY-MM-DD', true).isValid()
    ? moment(value).endOf('day')
    : moment(value);
  return LessThanOrEqual(date.toISOString());
};
