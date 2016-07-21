export default function padLeft(value, targetLength, pad = '0') {
  let paddedValue = String(value);

  while (paddedValue.length < targetLength) {
    paddedValue = pad + paddedValue;
  }

  return paddedValue;
}
