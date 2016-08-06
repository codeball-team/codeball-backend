import 'node-normalize-scss/_normalize.scss';
import 'styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { BACKGROUND_IMAGES } from 'constants';
import { BodyBackground } from 'components/ui';
import routes from './routes';
const store = configureStore(undefined, browserHistory);
const rootElement = document.getElementById('app');
const history = syncHistoryWithStore(browserHistory, store);

FastClick.attach(document.body);

ReactDOM.render(
  <Provider store={store}>
    {renderContent()}
  </Provider>,
  rootElement
);

function renderContent() {
  if (process.env.NODE_ENV !== 'production') {
    const DevTools = require('./containers/DevTools').default;

    return (
      <div>
        <BodyBackground images={BACKGROUND_IMAGES} />
        <Router key="router" history={history} routes={routes} />
        <DevTools key="devtools" />
      </div>
    );
  }

  return (
    <div>
      <BodyBackground images={BACKGROUND_IMAGES} />
      <Router history={history} routes={routes} />
    </div>
  );
}

/* TODO:
  - relatywne importy komponentow zmienic na referencje do components/xxx

  - wszystkie komponenty z bibliotek wrzucic do components/ui
  - loadable content -> bool or array prop (isLoading)
  - w implementacjach mapstatetoprops dla kontenerow obliczac od razu wszystkie potrzebne rzeczy (przemyslec wydajnosc)
*/
