import { _, moment } from 'utils';

export default function isDataInvalidated(lastUpdate, dataInvalidationTime) {
  return _.isUndefined(lastUpdate) || hasInvalidationTimePassed(lastUpdate, dataInvalidationTime);
}

function hasInvalidationTimePassed(lastUpdate, dataInvalidationTime) {
  return moment().isAfter(lastUpdate + dataInvalidationTime);
}
