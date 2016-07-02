import 'node-normalize-scss/_normalize.scss';
import 'styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { BodyBackground } from 'components/ui';
import { BACKGROUND_IMAGES } from 'constants';
import routes from './routes';

const store = configureStore(undefined, browserHistory);
const rootElement = document.getElementById('app');
const history = syncHistoryWithStore(browserHistory, store);

let content;

if (process.env.NODE_ENV !== 'production') {
  const DevTools = require('./containers/DevTools').default;

  content = (
    <div>
      <BodyBackground images={BACKGROUND_IMAGES} />
      <Router key="router" history={history} routes={routes} />
      <DevTools key="devtools" />
    </div>
  );
} else {
  content = (
    <div>
      <BodyBackground images={BACKGROUND_IMAGES} />
      <Router history={history} routes={routes} />
    </div>
  );
}

ReactDOM.render(
  <Provider store={store}>
    {content}
  </Provider>,
  rootElement
);
