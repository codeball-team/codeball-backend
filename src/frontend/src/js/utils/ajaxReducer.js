import _ from 'underscore';
import reducer from './reducer';

export const ajaxReducerInitialState = {
  isLoading: false,
  lastUpdate: undefined
};

export default function ajaxReducer(initialState, ajaxActions, handlers) {
  const { startAction, failureAction, successAction } = ajaxActions;
  const ajaxHandlers = {
    [startAction]: onAjaxStart,
    [failureAction]: onAjaxEnd,
    [successAction]: onAjaxEnd
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

function onAjaxStart(state, action) {
  return onUpdate({ ...state, isLoading: true }, action);
}

function onAjaxEnd(state, action) {
  return onUpdate({ ...state, isLoading: false }, action);
}

function onUpdate(state, action) {
  const { time: lastUpdate } = action;
  return { ...state, lastUpdate };
}
