import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import { routerMiddleware } from 'react-router-redux';
import { persistState } from 'redux-devtools';

export default function configureStore(initialState, history) {
  const store = createStore(rootReducer, initialState, createEnhancer(history));
  enableWebpackHMRForReducers(store);
  return store;
}

function createEnhancer(history) {
  if (process.env.NODE_ENV !== 'production') {
    return createDevelopmentEnhancer(createDevelopmentMiddleware(history));
  }

  return createProductionEnhancer(createProductionMiddleware(history));
}

function createProductionMiddleware(history) {
  return applyMiddleware(
    routerMiddleware(history),
    require('redux-thunk').default
  );
}

function createProductionEnhancer(middleware) {
  return compose(middleware);
}

function createDevelopmentMiddleware(history) {
  return applyMiddleware(
    routerMiddleware(history),
    require('redux-thunk').default,
    require('redux-immutable-state-invariant')()
  );
}

function createDevelopmentEnhancer(middleware) {
  const getDebugSessionKey = () => {
    // By default we try to read the key from ?debug_session=<key> in the address bar
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length) ? matches[1] : null;
  };

  const devToolsExtension = window.devToolsExtension;

  return compose(
    middleware,
    devToolsExtension ? devToolsExtension() : require('../containers/DevTools').default.instrument(),

    // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
    persistState(getDebugSessionKey())
  );
}

function enableWebpackHMRForReducers(store) {
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }
}
