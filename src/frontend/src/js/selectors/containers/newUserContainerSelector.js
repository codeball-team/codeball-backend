import { createStructuredSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isCurrentUserLoadingSelector
} from 'selectors/isLoading';
import { newUserSelector } from 'selectors/models/newUser';

const isNewUserLoadingSelector = createIsLoadingSelector(
  isCurrentUserLoadingSelector
);

export default createStructuredSelector({
  isLoading: isNewUserLoadingSelector,
  newUser: newUserSelector
});
