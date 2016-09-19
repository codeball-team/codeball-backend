import { reducer, safeGet } from 'utils';
import md5 from 'js-md5';

const ajaxReducerInitialState = {
  isLoading: false,
  hasLoaded: false,
  lastUpdateTimestamp: undefined,
  lastUpdateHash: md5(JSON.stringify(''))
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
  const responseBody = safeGet(action, ['response', 'body'], '');
  const responseHash = md5(JSON.stringify(responseBody));
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
