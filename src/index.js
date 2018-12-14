import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './containers/App';
import store from './Store';
import './styles.scss';

window.bootstrapXMRTO = function (node) {
  ReactDOM.render((
    <Provider {...store}>
      <App />
    </Provider>
  ), node);
};
