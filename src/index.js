import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import WAValidator from 'wallet-address-validator';
import App from './containers/App';
import store from './Store';
import config from './config';
import './styles.scss';

ReactDOM.render((
  <Provider {...store}>
    <App />
  </Provider>
), document.getElementById('root'));

const eventType = {
  setXMRAddress: 'address',
  setPP: 'pp',
};

window.chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'setXMRAddress') {
    const isTestNet = WAValidator.validate(request.address, 'bitcoin', 'testnet');
    const isProdNet = WAValidator.validate(request.address, 'bitcoin', 'prod');
    if (!isTestNet && !isProdNet) {
      alert('Address INVALID');
      return;
    } else {
      const netType = isProdNet ? 'mainnet' : 'stagenet';
      config.setAPI(netType);
      store.paramsStore.setNetType(netType);
    }
  }
  store.paramsStore.fetchParams();
  store.orderFormStore.changeAddress(request.address);
  store.orderFormStore.changeType(eventType[request.type]);
  store.routeStore.changeRoute(0);
});
