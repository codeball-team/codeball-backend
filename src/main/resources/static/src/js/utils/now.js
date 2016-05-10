import moment from 'moment';
import { DATE_TIME_FORMAT } from 'constants/Configuration';

export default function now() {
  return moment().format(DATE_TIME_FORMAT);
}
