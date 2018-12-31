import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './containers/App';
import store from './Store';
import './styles.scss';

ReactDOM.render((
  <Provider {...store}>
    <App />
  </Provider>
), document.getElementById('root'));


window.chrome.runtime.onMessage.addListener((request) => {
  if (request.type === "setXMRAddress") {
    store.orderFormStore.changeAddress(request.address);
    store.orderFormStore.changeType('address');
    store.routeStore.changeRoute(0);
  }
  if (request.type === "setPP") {
    store.orderFormStore.changeAddress(request.address);
    store.orderFormStore.changeType('pp');
    store.routeStore.changeRoute(0);
  }
});
