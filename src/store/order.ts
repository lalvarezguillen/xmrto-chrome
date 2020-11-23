/* eslint-disable no-param-reassign */
import { types, flow, Instance } from "mobx-state-tree";
import {
  createOrder as createOrderRequest,
  getOrderStatus,
  completeOrder as completeOrderRequest,
} from "../services";
import { STATUS } from "../constants";
import responseToCamelCase from "../helpers/responseToCamelCase";

export const initialState = {
  order: {
    btcAmount: 0,
    btcDestAddress: "",
    state: "",
    uuid: "",
    btcNumConfirmations: 0,
    btcNumConfirmationsThreshold: 0,
    btcTransactionId: "",
    incomingAmountTotal: 0,
    remainingAmountIncoming: 0,
    incomingPriceBtc: 0,
    receivingSubaddress: "",
    secondsTillTimeout: 0,
    incomingNumConfirmationsRemaining: 0,
    btcAmountPartial: 0,
  },
  orderAmount: 0,
};

const OrderModel = types.model("OrderModel", {
  btcAmount: types.number,
  btcDestAddress: types.string,
  state: types.string,
  uuid: types.string,
  btcNumConfirmations: types.number,
  btcNumConfirmationsThreshold: types.number,
  btcTransactionId: types.string,
  incomingAmountTotal: types.number,
  remainingAmountIncoming: types.number,
  incomingPriceBtc: types.number,
  receivingSubaddress: types.string,
  secondsTillTimeout: types.number,
  incomingNumConfirmationsRemaining: types.number,
  btcAmountPartial: types.number,
});

export interface IOrderModel extends Instance<typeof OrderModel> {}

export const OrderStoreModel = types
  .model("OrderStoreModel", {
    order: OrderModel,
    orderAmount: types.number,
  })
  .actions((self) => ({
    setData: (data: { [key: string]: string | number }): IOrderModel => {
      self.order = { ...initialState.order, ...data };
      return self.order;
    },
  }))
  .actions((self) => ({
    fetchOrder: flow(function* fetchOrderAction(data) {
      try {
        const response = yield getOrderStatus(data);
        const formattedData = responseToCamelCase(response.data);
        const payment =
          response.data.payments && response.data.payments[0]
            ? response.data.payments[0]
            : {};
        self.setData({
          ...formattedData,
          btcNumConfirmations: payment.num_confirmations || 0,
          btcTransactionId: payment.tx_id || "",
        });
        return Promise.resolve(formattedData);
      } catch (error) {
        if (error.response.status === 400 || error.response.status === 404) {
          self.setData({ state: STATUS.NOT_FOUND, ...data });
        }
        return Promise.reject(error.response);
      }
    }),
    createOrder: flow(function* createOrderAction(data) {
      try {
        const response = yield createOrderRequest(data);
        self.setData(responseToCamelCase(response.data));
        return Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error.response);
      }
    }),
    setOrderDestAddress: (address: string): void => {
      self.order = { ...initialState.order, btcDestAddress: address };
    },
    completeOrder: (data: { uuid: string }): Promise<void> =>
      completeOrderRequest(data),
  }));

export interface IOrderStoreModel extends Instance<typeof OrderStoreModel> {}

export function createStore(): IOrderStoreModel {
  return OrderStoreModel.create(initialState);
}
