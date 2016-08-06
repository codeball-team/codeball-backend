import { _ } from 'utils';

export default function model(defaults) {
  return data => _({ ...data }).defaults(defaults);
}
