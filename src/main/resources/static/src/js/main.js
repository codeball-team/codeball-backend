import 'node-normalize-scss/_normalize.scss';
import 'react-datepicker/dist/react-datepicker.css';
import 'styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';

const store = configureStore(undefined, browserHistory);
const rootElement = document.getElementById('app');
const history = syncHistoryWithStore(browserHistory, store);

let ComponentEl;

if (process.env.NODE_ENV !== 'production') {
  const DevTools = require('./containers/DevTools').default;

  ComponentEl = (
    <div>
      <Router key="router" history={history} routes={routes} />
      <DevTools key="devtools" />
    </div>
  );
} else {
  ComponentEl = (
    <div>
      <Router history={history} routes={routes} />
    </div>
  );
}

ReactDOM.render(
  <Provider store={store}>
    {ComponentEl}
  </Provider>,
  rootElement
);
