import { SAY_HELLO } from 'constants/ActionTypes';

const initialState = false;

export default function(state = initialState, action) {
  switch (action.type) {
    case SAY_HELLO:
      return true;

    default:
      return state;
  }
}
