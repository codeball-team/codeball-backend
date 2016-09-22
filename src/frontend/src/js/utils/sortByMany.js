export default function sortByMany(list, attributes, options = {}) {
  const {
    caseSensitive = false,
    localized = true
  } = options;
  const reversedAttributes = [...attributes].reverse();
  const attributeGetterCreator = caseSensitive ? createAttributeGetter : createLowerCaseAttributeGetter;
  const attributeComparatorCreator = localized ? createLocaleAttributeComparator : createAttributeComparator;

  return reversedAttributes.reduce(
    (sortedList, attribute) => sortedList.sort(attributeComparatorCreator(attributeGetterCreator(attribute))),
    [...list]
  );
}

function createAttributeGetter(attribute) {
  return item => item[attribute];
}

function createLowerCaseAttributeGetter(attribute) {
  return item => item[attribute].toLowerCase();
}

function createLocaleAttributeComparator(attributeGetter) {
  return (item1, item2) => attributeGetter(item1).localeCompare(attributeGetter(item2));
}

function createAttributeComparator(attributeGetter) {
  return (item1, item2) => attributeGetter(item1) < attributeGetter(item2);
}
