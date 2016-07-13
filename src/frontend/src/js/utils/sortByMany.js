import _ from 'underscore';

export default function sortByMany(list, ...attributes) {
  return attributes.reverse().reduce((sortedList, attribute) => _(sortedList).sortBy(attribute), list);
}
