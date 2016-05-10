import isDataInvalidated from './isDataInvalidated';

export default function refreshDataIfNecessary(data, loadDataActionCallback) {
  const {
    isLoading,
    lastUpdate
  } = data;

  if (!isLoading && isDataInvalidated(lastUpdate)) {
    loadDataActionCallback();
  }
}
