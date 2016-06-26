import _ from 'underscore';
import moment from 'moment';

export const DATE_FORMAT = 'YYYY/MM/DD (ddd)';
export const TIME_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;
export const UNIX_JAVA_TIMESTAMP_FACTOR = 1000;

export const DATA_INVALIDATION_TIME = 5 * 60 * 1000 * 1000;

export const ENROLLMENT_STATUS_YES = 'YES';
export const ENROLLMENT_STATUS_MAYBE = 'MAYBE';
export const ENROLLMENT_STATUS_NO = 'NO';
export const ENROLLMENT_STATUS_STRING = {
  [ENROLLMENT_STATUS_YES]: 'Going',
  [ENROLLMENT_STATUS_MAYBE]: 'Unsure',
  [ENROLLMENT_STATUS_NO]: 'Not going'
};

export const PITCH_TYPE_FIRM_GROUND = 1;
export const PITCH_TYPE_HARD_GROUND = 2;
export const PITCH_TYPE_ARTIFICIAL_HARD = 3;
export const PITCH_TYPE_ARTIFICIAL_SOFT = 4;
export const PITCH_TYPE_INDOOR = 5;
export const PITCH_TYPE_STRING = {
  [PITCH_TYPE_FIRM_GROUND]: 'Firm Ground',
  [PITCH_TYPE_HARD_GROUND]: 'Hard Ground',
  [PITCH_TYPE_ARTIFICIAL_HARD]: 'Artificial Hard',
  [PITCH_TYPE_ARTIFICIAL_SOFT]: 'Artificial Soft (Turf)',
  [PITCH_TYPE_INDOOR]: 'Indoor'
};

export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_USER = 'ROLE_USER';
export const ROLE_STRING = {
  [ROLE_ADMIN]: 'Admin',
  [ROLE_USER]: 'User'
};

export const USER_MISSING_PICTURE_URL = '/images/user-missing-picture.png';

export const DURATION_OPTIONS = [30, 45, 60, 90, 120, 150, 180].map(minutes => ({
  label: `${minutes} min`,
  value: minutes
}));

export const MINUTES_OPTIONS = [0, 15, 30, 45].map(minutes => ({
  label: moment(`${minutes}`, 'm').format('mm'),
  value: minutes
}));

export const HOURS_OPTIONS = _.range(0, 24).map(hours => {
  const offsetHours = (hours + 8) % 24;
  return {
    label: moment(`${offsetHours}`, 'H').format('HH'),
    value: offsetHours
  };
})

export function mapsUrl(address) {
  return `https://www.google.com/maps/?q=${address}`;
}

export function javaToUnixTimestamp(javaTimestamp) {
  return javaTimestamp * UNIX_JAVA_TIMESTAMP_FACTOR;
}

export function unixToJavaTimestamp(unixTimestamp) {
  return unixTimestamp / UNIX_JAVA_TIMESTAMP_FACTOR;
}
