import axios from 'axios';
import store from '../Store';
import config from '../config';
import { STATUS, ERROR_CODES } from '../constants';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const isOffline = (error) => {
  if (error.code === 'ECONNABORTED' || !error.response) {
    store.paramsStore.setStatus(STATUS.OFFLINE);
  }
};
const isIPBlocked = (error) => {
  if (error.response.status === 403 && error.response.data.error === ERROR_CODES.IPBLOCKED) {
    store.paramsStore.setStatus(STATUS.IPBLOCKED);
    return true;
  }
  return false;
};
const isRateLimit = (error) => {
  if (error.response.status === 403 && error.response.data.error === ERROR_CODES.RATELIMIT) {
    store.paramsStore.setStatus(STATUS.RATELIMIT);
    return true;
  }
  return false;
};
const isAPIError = (error) => {
  if (error.response.status !== 400 && error.response.status !== 403) {
    // if request returns an error
    store.paramsStore.setStatus(STATUS.APIERROR);
    return true;
  }
  return false;
};
function successCallback(response) {
  // remove notification about connection
  store.paramsStore.setStatus(STATUS.ONLINE);
  return response;
}
const errorCallback = callbacks => (error) => {
  for (let i = 0; i < callbacks.length; i += 1) {
    const hasError = callbacks[i](error);
    if (hasError) break;
  }
  return Promise.reject(error);
};

export const getOrderParameters = () => axios.get(`${config.api}/order_parameter_query/`)
  .then(successCallback, errorCallback([isOffline, isIPBlocked, isRateLimit, isAPIError]));

export const getOrderStatus = data => axios.post(`${config.api}/order_status_query/`, data)
  .then(successCallback, errorCallback([isOffline, isIPBlocked, isRateLimit, isAPIError]));

export const createOrder = data => axios.post(`${config.api}/order_create/`, data)
  .then(successCallback, errorCallback([isOffline, isIPBlocked, isAPIError]));

export const createOrderPP = data => axios.post(`${config.api}/order_create_pp/`, data)
  .then(successCallback, errorCallback([isOffline, isIPBlocked, isAPIError]));
