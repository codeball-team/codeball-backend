import { _, reducer } from 'utils';

const ajaxReducerInitialState = {
  isLoading: false,
  hasLoaded: false,
  lastUpdate: undefined
};

export default function ajaxReducer(initialState, ajaxActions, handlers) {
  const { startAction, failureAction, successAction } = ajaxActions;
  const ajaxHandlers = {
    [startAction]: onAjaxStart,
    [failureAction]: onAjaxFail,
    [successAction]: onAjaxSuccess
  };

  const reducerInitialState = {
    ...ajaxReducerInitialState,
    ...initialState
  };
  const originalReducer = reducer(reducerInitialState, handlers);

  return (state = reducerInitialState, action) => {
    const { type } = action;
    const newState = {
      ...state,
      ...originalReducer(state, action)
    };

    if (_(ajaxHandlers).has(type)) {
      const handler = ajaxHandlers[type];
      const enhancedNewState = handler(newState, action);
      return enhancedNewState;
    }

    return newState;
  };
}

function onAjaxStart(state, action) {
  return onUpdate({ ...state, isLoading: true }, action);
}

function onAjaxSuccess(state, action) {
  return { ...onAjaxEnd(state, action), hasLoaded: true };
}

function onAjaxFail(state, action) {
  return { ...onAjaxEnd(state, action), hasLoaded: false };
}

function onAjaxEnd(state, action) {
  return onUpdate({ ...state, isLoading: false }, action);
}

function onUpdate(state, action) {
  const { time: lastUpdate } = action;
  return { ...state, lastUpdate };
}
