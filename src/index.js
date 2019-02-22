import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import WAValidator from 'wallet-address-validator';
import App from './containers/App';
import store from './Store';
import config from './config';
import './styles.scss';

function render(props = {}) {
  store.paramsStore.fetchParams();
  ReactDOM.render((
    <Provider {...store}>
      <App {...props} />
    </Provider>
  ), document.getElementById('root'));

}

window.chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'runApp') {
    if (request.usePP) {
      config.setAPI('mainnet');
      render({ address: request.address, usePP: true, netType: 'mainnet' });
    } else {
      const isTestNet = WAValidator.validate(request.address, 'bitcoin', 'testnet');
      const isProdNet = WAValidator.validate(request.address, 'bitcoin', 'prod');
      if (!isTestNet && !isProdNet) {
        alert('Address INVALID');
        return;
      }
      const netType = isProdNet ? 'mainnet' : 'stagenet';
      config.setAPI(netType);
      render({ address: request.address, usePP: request.usePP, netType });
    }
  }
});
