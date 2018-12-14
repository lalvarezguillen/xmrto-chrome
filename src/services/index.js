import axios from 'axios';
import store from '../Store';
import config from '../config';
import { STATUS } from '../constants';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function successCallback(response) {
  // remove notification about connection
  store.paramsStore.setStatus(STATUS.ONLINE);
  return response;
}

function errorCallback(error) {
  if (error.code === 'ECONNABORTED' || !error.response) {
    store.paramsStore.setStatus(STATUS.OFFLINE);
  } else {
    // if request returns an error
    store.paramsStore.setStatus(STATUS.APIERROR);
  }
  return Promise.reject(error);
}

export const getOrderParameters = () => axios.get(`${config.api}/order_parameter_query/`)
  .then(successCallback, errorCallback);

export const getOrderStatus = data => axios.post(`${config.api}/order_status_query/`, data);

export const createOrder = data => axios.post(`${config.api}/order_create/`, data);

export const createOrderPP = data => axios.post(`${config.api}/order_create_pp/`, data);

export const getServicesStatus = () => axios.get(`https://updown.io/api/checks?api-key=${config.updown_api_key}`);
