export default function randomInteger(max) {
  return Math.round((Math.random() * max)) % max;
}
