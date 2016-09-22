import { createStructuredSelector } from 'reselect';
import { newUserSelector } from 'selectors/models/newUser';

export default createStructuredSelector({
  newUser: newUserSelector
});
