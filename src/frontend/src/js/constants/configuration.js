import { _ } from 'utils';

export const AUTO_REFRESH_DELAY = 10000;
export const USER_MISSING_PICTURE_URL = '/images/user-missing-picture.png';

export const DATE_FORMAT = 'YYYY/MM/DD (ddd)';
export const MONTH_YEAR_FORMAT = 'YYYY/MM';
export const TIME_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

export const DURATION_OPTIONS = [60, 90, 120, 150, 180].map(minutes => ({
  label: `${minutes} min`,
  value: minutes
}));
export const MINUTE_OPTIONS = [0, 15, 30, 45];
export const HOUR_OPTIONS = _.range(0, 24);
