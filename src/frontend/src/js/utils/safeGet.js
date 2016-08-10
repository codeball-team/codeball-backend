import { _ } from 'utils';

export default function safeGet(source, path = [], defaultValue = undefined) {
  return path.reduce((result, attribute) => {
    if (result === defaultValue || !canGetDeeper(result, attribute)) {
      return defaultValue;
    }

    return result[attribute];
  }, source);
}

function canGetDeeper(currentValue, attribute) {
  return _(currentValue).has(attribute) && currentValue[attribute] !== undefined;
}
