import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

export const RangeDates = (from: Date | string, to: Date | string) => {
  const dateFrom = typeof from === 'string' ? new Date(from) : from;
  const dateTo = typeof to === 'string' ? new Date(to) : to;
  dateFrom.setDate(dateFrom.getDate() - 1);
  dateTo.setDate(dateTo.getDate() + 1);
  return Between(dateFrom.toISOString(), dateTo.toISOString());
};

export const FromDate = (value: Date | string) => {
  const date = typeof value === 'string' ? new Date(value) : value;
  return MoreThanOrEqual(date.toISOString());
};

export const ToDate = (value: Date | string) => {
  const date = typeof value === 'string' ? new Date(value) : value;
  return LessThanOrEqual(date.toISOString());
};
