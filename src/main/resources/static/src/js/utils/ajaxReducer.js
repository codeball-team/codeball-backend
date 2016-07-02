import _ from 'underscore';
import reducer from './reducer';

export default function ajaxReducer(initialState, ajaxActions, handlers) {
  const { startAction, failureAction, successAction } = ajaxActions;
  const ajaxHandlers = {
    [startAction]: state => ({ ...state, isLoading: true }),
    [failureAction]: state => ({ ...state, isLoading: false }),
    [successAction]: state => ({ ...state, isLoading: false })
  };

  const originalReducer = reducer(initialState, handlers);

  return (state = initialState, action) => {
    const { type } = action;
    let ajaxEnhancedState = state;

    if (_(ajaxHandlers).has(type)) {
      const handler = ajaxHandlers[type];
      ajaxEnhancedState = handler(state, action);
    }

    return originalReducer(ajaxEnhancedState, action);
  };
}
