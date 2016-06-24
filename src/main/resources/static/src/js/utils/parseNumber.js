export default function parseNumber(score) {
  return score ? Number(score) || 0 : undefined;
}
