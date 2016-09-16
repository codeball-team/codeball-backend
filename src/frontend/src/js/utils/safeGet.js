import { _ } from 'utils';

export default function safeGet(source, path = [], defaultValue = undefined) {
  return path.reduce((result, attribute, attributeIndex) => {
    const isLastAttribute = attributeIndex === path.length - 1;

    if ([
      result === defaultValue,
      isLastAttribute && shouldReturnDefaultValue(result, attribute, defaultValue),
      !canGetDeeper(result, attribute)
    ].some(Boolean)) {
      return defaultValue;
    }

    return result[attribute];
  }, source);
}

function shouldReturnDefaultValue(currentValue, attribute, defaultValue) {
  if (!canGetDeeper(currentValue, attribute)) {
    return true;
  }

  const value = currentValue[attribute];
  const defaultValueType = typeof defaultValue;
  return [
    value === null,
    !['undefined', typeof value].includes(defaultValueType)
  ].some(Boolean);
}

function canGetDeeper(currentValue, attribute) {
  return _(currentValue).has(attribute);
}
