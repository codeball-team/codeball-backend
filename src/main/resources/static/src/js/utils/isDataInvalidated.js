import moment from 'moment';
import { DATA_INVALIDATION_TIME } from 'constants';

export default function isDataInvalidated(lastUpdate) {
  return lastUpdate === undefined
    || moment().isAfter(lastUpdate + DATA_INVALIDATION_TIME);
}
