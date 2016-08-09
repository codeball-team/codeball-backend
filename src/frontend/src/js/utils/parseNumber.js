export default function parseNumber(value) {
  return value ? Number(value) || 0 : undefined;
}
