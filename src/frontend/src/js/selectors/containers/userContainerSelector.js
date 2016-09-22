import { createStructuredSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isUserDataLoadingSelector
} from 'selectors/isLoading';
import {
  hasUserLoadedSelector,
  userSelector
} from 'selectors/models/user';

const isUserLoadingSelector = createIsLoadingSelector(
  isUserDataLoadingSelector
);

export default createStructuredSelector({
  isLoading: isUserLoadingSelector,
  hasUserLoaded: hasUserLoadedSelector,
  user: userSelector
});
