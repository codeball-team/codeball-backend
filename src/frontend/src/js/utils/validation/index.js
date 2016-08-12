export function isId(value) {
  return isInteger(value);
}

export function isInRange(value, min, max) {
  return value >= min && value <= max;
}

export function isInteger(value) {
  return Number.isInteger(value);
}

export function isNotEmptyString(value) {
  return typeof value === 'string' && value.length > 0;
}

export function isPositiveInteger(value) {
  return isInteger(value) && value > 0;
}
