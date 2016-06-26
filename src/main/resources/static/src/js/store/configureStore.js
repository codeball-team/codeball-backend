import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import { routerMiddleware } from 'react-router-redux';
import { persistState } from 'redux-devtools';

export default function configureStore(initialState, history) {
  let enhancer;

  if (process.env.NODE_ENV !== 'production') {
    let middleware = applyMiddleware(
      routerMiddleware(history),
      require('redux-thunk').default,
      require('redux-immutable-state-invariant')()
    );
    enhancer = createProductionEnhancer(middleware);
  } else {
    let middleware = applyMiddleware(
      require('redux-thunk').default
    );
    enhancer = createDevelopmentEnhancer(middleware);
  }

  const store = createStore(rootReducer, initialState, enhancer);
  enableWebpackHMRForReducers(store);
  return store;
}

function createProductionEnhancer(middleware) {
  let getDebugSessionKey = function () {
    // By default we try to read the key from ?debug_session=<key> in the address bar
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length) ? matches[1] : null;
  };

  return compose(
    middleware,
    window.devToolsExtension ?
      window.devToolsExtension() :
      require('../containers/DevTools').default.instrument(),

    // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
    persistState(getDebugSessionKey())
  );
}

function createDevelopmentEnhancer(middleware) {
  return compose(middleware);
}

function enableWebpackHMRForReducers(store) {
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }
}
