import _ from 'underscore';

export default function safeGet(object, path, defaultValue = undefined) {
  const subAttributes = [...path].reverse();
  let currentValue = object;

  while (subAttributes.length > 0) {
    const attribute = subAttributes.pop();
    if (!_(currentValue).has(attribute) || currentValue[attribute] === undefined) {
      return defaultValue;
    }

    currentValue = currentValue[attribute];
  }

  return currentValue;
}
