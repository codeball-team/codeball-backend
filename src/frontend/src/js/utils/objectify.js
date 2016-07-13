import _ from 'underscore';

export default function objectify(list, idAttribute = 'id') {
  return _.object(
    _(list).pluck(idAttribute),
    list
  );
}
