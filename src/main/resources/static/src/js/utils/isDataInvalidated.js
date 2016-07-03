import _ from 'underscore';
import moment from 'moment';
import { DATA_INVALIDATION_TIME } from 'constants';

export default function isDataInvalidated(lastUpdate) {
  return _.isUndefined(lastUpdate) || hasInvalidationTimePassed(lastUpdate);
}

function hasInvalidationTimePassed(lastUpdate) {
  return moment().isAfter(lastUpdate + DATA_INVALIDATION_TIME);
}
