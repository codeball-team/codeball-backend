import { BaseComponent } from 'components/base';
import ReactDatepickerCalendar from 'react-datepicker/lib/calendar';
import { Link as ReactRouterLink } from 'react-router';
import ReactSelect from 'react-select';

export const Calendar = BaseComponent(ReactDatepickerCalendar);
export const RouterLink = BaseComponent(ReactRouterLink);
export const Select = BaseComponent(ReactSelect);

export * from './buttons';

export BodyBackground from './BodyBackground/BodyBackground';
export Button from './Button/Button';
export ButtonsPanel from './ButtonsPanel/ButtonsPanel';
export Errors from './Errors/Errors';
export Form, {
  EditableText,
  InputWrapper,
  NumberPicker,
  RangePicker,
  ValuePicker
} from './Form';
export Icon from './Icon/Icon';
export IconButton from './IconButton/IconButton';
export Link from './Link/Link';
export List from './List/List';
export ListItem from './ListItem/ListItem';
export LoadableContent from './LoadableContent/LoadableContent';
export Navigation from './Navigation/Navigation';
export NotLoaded from './NotLoaded/NotLoaded';
export Page from './Page/Page';
export Section from './Section/Section';
export Spinner from './Spinner/Spinner';
