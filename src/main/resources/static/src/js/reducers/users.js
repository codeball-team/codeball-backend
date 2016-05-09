import _ from 'underscore';
import { reducer, safeGet } from 'utils';
import { LOAD_USERS_SUCCESS } from 'constants/ActionTypes';

const initialState = {
  1: {
    id: 1,
    firstName: 'Kazimierz',
    lastName: 'Wielki'
  },
  2: {
    id: 2,
    firstName: 'Mieszko',
    lastName: 'I'
  },
  3: {
    id: 3,
    firstName: 'Władysław',
    lastName: 'Jagiełło'
  },
  4: {
    id: 4,
    firstName: 'Bolesław',
    lastName: 'Chrobry'
  }
};

export default reducer(initialState, {
  [LOAD_USERS_SUCCESS]: (state, action) => {
    const users = safeGet(action, 'response._embedded.users');

    const mappedUsers = _(users || []).map(user => ({
      id: safeGet(user, '_links.self.href'),
      firstName: user.firstName,
      lastName: user.lastName
    }));

    return _.object(
      _(mappedUsers).pluck('id'),
      mappedUsers
    );
  }
});
