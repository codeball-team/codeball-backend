import { _ } from 'utils';

export default function safeGet(object, path, defaultValue = undefined) {
  return path.reduce((result, attribute) => {
    if (result === defaultValue || !canGetDeeper(result, attribute)) {
      return defaultValue;
    }

    return result[attribute];
  }, object);
}

function canGetDeeper(currentValue, attribute) {
  return _(currentValue).has(attribute) && currentValue[attribute] !== undefined;
}
