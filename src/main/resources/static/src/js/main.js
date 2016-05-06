import 'node-normalize-scss/_normalize.scss';
import 'styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore  from './store/configureStore';
import { Router, hashHistory } from 'react-router';
import routes from './routes';

const store = configureStore();
const rootElement = document.getElementById('app');

let ComponentEl;

if (process.env.NODE_ENV !== 'production') {
  const DevTools = require('./containers/DevTools').default;

  ComponentEl = (
    <div>
      <Router key="router" history={hashHistory} routes={routes} />
      <DevTools key="devtools" />
    </div>
  );
} else {
  ComponentEl = (
    <div>
      <Router history={hashHistory} routes={routes} />
    </div>
  );
}

// Render the React application to the DOM
ReactDOM.render(
  <Provider store={store}>
    {ComponentEl}
  </Provider>,
  rootElement
);
