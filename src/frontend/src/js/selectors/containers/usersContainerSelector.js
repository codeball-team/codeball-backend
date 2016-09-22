import { createStructuredSelector } from 'reselect';
import {
  createIsLoadingSelector,
  isUsersDataLoadingSelector
} from 'selectors/isLoading';
import { currentUserSelector } from 'selectors/models/currentUser';
import { sortedUsersSelector } from 'selectors/models/users';

const areUsersLoadingSelector = createIsLoadingSelector(
  isUsersDataLoadingSelector
);

export default createStructuredSelector({
  isLoading: areUsersLoadingSelector,
  currentUser: currentUserSelector,
  users: sortedUsersSelector
});
