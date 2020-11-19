import axios from "axios";
import config from "./config";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export const getOrderParameters = (): Promise<void> =>
  axios.get(`${config.api}/order_parameter_query/`);

export const getOrderStatus = (data: { uuid: string }): Promise<void> =>
  axios.post(`${config.api}/order_status_query/`, data);

export const createOrder = (data: {
  amount: number;
  amount_currency: string;
  btc_dest_address: string;
}): Promise<void> => axios.post(`${config.api}/order_create/`, data);

export const completeOrder = (data: { uuid: string }): Promise<void> =>
  axios.post(`${config.api}/order_partial_payment/`, data);
