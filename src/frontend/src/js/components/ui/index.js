import { BaseComponent } from 'components/base';
import Calendar as ReactDatepickerCalendar from 'react-datepicker/lib/calendar';
import { Link as ReactRouterLink } from 'react-router';
import Select as ReactSelect from 'react-select';

export const Calendar = BaseComponent(ReactDatepickerCalendar);
export const Link = BaseComponent(ReactRouterLink);
export const Select = BaseComponent(ReactSelect);

export * from './buttons';

export BodyBackground from './BodyBackground/BodyBackground';
export Button from './Button/Button';
export ButtonsPanel from './ButtonsPanel/ButtonsPanel';
export EditableText from './EditableText/EditableText';
export Errors from './Errors/Errors';
export Form from './Form/Form';
export Icon from './Icon/Icon';
export IconButton from './IconButton/IconButton';
export InputWrapper from './InputWrapper/InputWrapper';
export List from './List/List';
export ListItem from './ListItem/ListItem';
export LoadableContent from './LoadableContent/LoadableContent';
export Navigation from './Navigation/Navigation';
export Page from './Page/Page';
export RangePicker from './RangePicker/RangePicker';
export Section from './Section/Section';
export Spinner from './Spinner/Spinner';
export ValuePicker from './ValuePicker/ValuePicker';
