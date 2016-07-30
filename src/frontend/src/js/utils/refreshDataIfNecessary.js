import isDataInvalidated from './isDataInvalidated';

export default function refreshDataIfNecessary(data, refreshDataCallback) {
  const { isLoading, lastUpdate } = data;

  if (!isLoading && isDataInvalidated(lastUpdate)) {
    refreshDataCallback();
  }
}
