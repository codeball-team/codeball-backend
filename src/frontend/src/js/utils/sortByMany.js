import _ from 'underscore';

export default function sortByMany(list, attributes, options = { caseSensitive: false }) {
  const { caseSensitive } = options;
  const reversedAttributes = [...attributes].reverse();

  if (caseSensitive) {
    return sortByManyCaseSensitive(list, reversedAttributes);
  }

  return sortByManyCaseInsensitive(list, reversedAttributes);
}

function sortByManyCaseInsensitive(list, reversedAttributes) {
  return reversedAttributes.reduce(
    (sortedList, attribute) => _(sortedList).sortBy(
      item => String(item[attribute]).toLowerCase()
    ),
    list
  );
}

function sortByManyCaseSensitive(list, reversedAttributes) {
  return reversedAttributes.reduce((sortedList, attribute) => _(sortedList).sortBy(attribute), list);
}
