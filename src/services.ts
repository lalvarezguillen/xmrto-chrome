import axios, { AxiosError, AxiosResponse } from "axios";
import config from "./config";
import {
  successCallback,
  errorCallback,
  isOffline,
  isIPBlocked,
  isRateLimit,
  isAPIError,
  handleCode400,
  SetStatusType,
} from "./errorHandlers";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export const getOrderParameters = (
  setStatus: SetStatusType
): Promise<AxiosResponse | AxiosError> =>
  axios
    .get(`${config.api}/order_parameter_query/`)
    .then(
      successCallback(setStatus),
      errorCallback(
        [isOffline, isIPBlocked, isRateLimit, isAPIError, handleCode400],
        setStatus
      )
    );

export const getOrderStatus = (
  data: { uuid: string },
  setStatus: SetStatusType
): Promise<AxiosResponse | AxiosError> =>
  axios
    .post(`${config.api}/order_status_query/`, data)
    .then(
      successCallback(setStatus),
      errorCallback([isOffline, isIPBlocked, isRateLimit], setStatus)
    );

export const createOrder = (
  data: {
    amount: number;
    amount_currency: string;
    btc_dest_address: string;
  },
  setStatus: SetStatusType
): Promise<AxiosResponse | AxiosError> =>
  axios
    .post(`${config.api}/order_create/`, data)
    .then(
      successCallback(setStatus),
      errorCallback([isOffline, isIPBlocked, isAPIError], setStatus)
    );

export const completeOrder = (
  data: { uuid: string },
  setStatus: SetStatusType
): Promise<AxiosResponse | AxiosError> =>
  axios
    .post(`${config.api}/order_partial_payment/`, data)
    .then(
      successCallback(setStatus),
      errorCallback([isOffline, isIPBlocked, isAPIError], setStatus)
    );
