import _ from 'underscore';
import { reducer, safeGet } from 'utils';
import { LOAD_USERS_SUCCESS } from 'constants/ActionTypes';

const initialState = {
  1: {
    id: 1,
    name: 'Kazimierz Wielki'
  },
  2: {
    id: 2,
    name: 'Mieszko I'
  },
  3: {
    id: 3,
    name: 'Władysław Jagiełło'
  },
  4: {
    id: 4,
    name: 'Bolesław Chrobry'
  }
};

export default reducer(initialState, {
  [LOAD_USERS_SUCCESS]: (state, action) => {
    const users = safeGet(action, 'response._embedded.users');

    const mappedUsers = _(users || []).map(user => ({
      id: safeGet(user, '_links.self.href'),
      name: `${user.lastName} ${user.firstName}`
    }));

    return _.object(
      _(mappedUsers).pluck('id'),
      mappedUsers
    );
  }
});
