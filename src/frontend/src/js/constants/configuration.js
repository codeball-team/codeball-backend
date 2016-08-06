import { _ } from 'utils';

export const DATA_INVALIDATION_TIME = 1000;
export const USER_MISSING_PICTURE_URL = '/images/user-missing-picture.png';

export const DATE_FORMAT = 'YYYY/MM/DD (ddd)';
export const MONTH_YEAR_FORMAT = 'YYYY/MM';
export const TIME_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;
export const UNIX_JAVA_TIMESTAMP_FACTOR = 1000;

export const ENROLLMENT_STATUS_YES = 'YES';
export const ENROLLMENT_STATUS_MAYBE = 'MAYBE';
export const ENROLLMENT_STATUS_NO = 'NO';
export const ENROLLMENT_STATUS_STRING = {
  [ENROLLMENT_STATUS_YES]: 'Going',
  [ENROLLMENT_STATUS_MAYBE]: 'Unsure',
  [ENROLLMENT_STATUS_NO]: 'Not going'
};
export const ENROLLMENT_STATUSES = Object.keys(ENROLLMENT_STATUS_STRING);

export const PITCH_TYPE_FIRM_GROUND = 'FIRM_GROUND';
export const PITCH_TYPE_HARD_GROUND = 'HARD_GROUND';
export const PITCH_TYPE_SOFT_GROUND = 'SOFT_GROUND';
export const PITCH_TYPE_ARTIFICIAL_SOFT = 'ARTIFICIAL_SOFT';
export const PITCH_TYPE_INDOOR = 'INDOOR';
export const PITCH_TYPE_STRING = {
  [PITCH_TYPE_FIRM_GROUND]: 'Firm ground',
  [PITCH_TYPE_HARD_GROUND]: 'Hard ground',
  [PITCH_TYPE_SOFT_GROUND]: 'Soft ground',
  [PITCH_TYPE_ARTIFICIAL_SOFT]: 'Artificial soft (turf)',
  [PITCH_TYPE_INDOOR]: 'Indoor'
};
export const PITCH_TYPE_OPTIONS = _(PITCH_TYPE_STRING).map((label, value) => ({
  label,
  value
}));

export const MIN_PITCH_CAPACITY = 2;
export const MAX_PITCH_CAPACITY = 22;
export const DURATION_OPTIONS = [60, 90, 120, 150, 180].map(minutes => ({
  label: `${minutes} min`,
  value: minutes
}));
export const MINUTE_OPTIONS = [0, 15, 30, 45];
export const HOUR_OPTIONS = _.range(0, 24);

export function mapsUrl(address) {
  return `https://www.google.com/maps/?q=${address}`;
}

export function javaToUnixTimestamp(javaTimestamp) {
  return javaTimestamp * UNIX_JAVA_TIMESTAMP_FACTOR;
}

export function unixToJavaTimestamp(unixTimestamp) {
  return unixTimestamp / UNIX_JAVA_TIMESTAMP_FACTOR;
}
