import { _ } from 'utils';

export default function objectify(list, idAttribute = 'id') {
  return _.object(
    _(list).pluck(idAttribute),
    list
  );
}
