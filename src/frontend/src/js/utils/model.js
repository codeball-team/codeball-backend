import _ from 'underscore';

export default function model(defaults) {
  return data => _({ ...data }).defaults(defaults);
}
