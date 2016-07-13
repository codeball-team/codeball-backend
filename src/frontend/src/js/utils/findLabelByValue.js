export default function findLabelByValue(options, searchValue) {
  const option = options.find(({ value }) => value === searchValue);
  const { label } = option || {};
  return label;
}
