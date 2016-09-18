import { _ } from 'utils';

export default function safeGet(object, path = [], defaultValue = undefined) {
  const result = baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

function baseGet(object, path) {
  let currentObject = object;
  let index = 0;
  const { length } = path;

  while (index < length && canGetDeeper(currentObject, path[index])) {
    currentObject = currentObject[path[index++]];
  }

  return (index && index === length) ? currentObject : undefined;
}

function canGetDeeper(object, attribute) {
  return _(object).has(attribute);
}
