export default function formatRange(min, max) {
  return min === max ? `${min}` : `${min} - ${max}`;
}
