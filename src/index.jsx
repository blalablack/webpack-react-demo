import React from 'react';
import ReactDOM from 'react-dom';
import './Css/game';
import './Css/ha';
import { AppContainer } from 'react-hot-loader';
import App from './BaseComponent/App';


ReactDOM.render(
  <AppContainer>
    <App/>
  </AppContainer>,
  document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./BaseComponent/App', () => {
    const NextApp = require('./BaseComponent/App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}