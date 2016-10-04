import { getObjectHash, reducer } from 'utils';

const ajaxReducerInitialState = {
  isLoading: false,
  hasLoaded: false,
  lastUpdateTimestamp: undefined,
  lastUpdateHash: undefined
};

export default function ajaxReducer(initialState, actionType, handlers) {
  const ajaxHandlers = {
    [actionType]: onAjaxStart,
    [actionType.FAILURE]: onAjaxFail,
    [actionType.SUCCESS]: onAjaxSuccess
  };

  const reducerInitialState = {
    ...ajaxReducerInitialState,
    ...initialState
  };
  const originalReducer = reducer(reducerInitialState, handlers);

  return (state = reducerInitialState, action) => {
    const { lastUpdateHash } = state;
    const { type } = action;
    const ajaxHandler = ajaxHandlers[type];

    if(ajaxHandler) {
      const newState = ajaxHandler(state, action);
      const hasHashChanged = lastUpdateHash !== newState.lastUpdateHash;

      if(hasHashChanged) {
        return {
          ...newState,
          ...originalReducer(newState, action)
        };
      }

      return newState;
    }

    return {
      ...state,
      ...originalReducer(state, action)
    };
  };
}

function onAjaxStart(state, action) {
  return onUpdate({
    ...state,
    isLoading: true
  }, action);
}

function onAjaxSuccess(state, action) {
  return {
    ...onAjaxEnd(state, action),
    hasLoaded: true
  };
}

function onAjaxFail(state, action) {
  return {
    ...onAjaxEnd(state, action),
    hasLoaded: false
  };
}

function onAjaxEnd(state, action) {
  const { response } = action;
  const responseHash = getObjectHash(response);
  return onUpdate({
    ...state,
    isLoading: false,
    lastUpdateHash: responseHash
  }, action);
}

function onUpdate(state, action) {
  const { timestamp: lastUpdateTimestamp } = action;
  return {
    ...state,
    lastUpdateTimestamp
  };
}
