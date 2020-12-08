/* eslint-disable no-param-reassign */
import { types, flow, Instance, getRoot } from "mobx-state-tree";
import { getOrderParameters } from "../services";
import { ERROR_CODES, STATUS } from "../constants";
import { applySnapshot, saveSnapshot } from "./utils";

export const initialState = {
  params: {
    price: 0,
    lowerLimit: 0,
    upperLimit: 0,
    lnUpperLimit: 0,
    lnLowerLimit: 0,
    zeroConfEnabled: true,
    zeroConfMaxAmount: 0,
    status: STATUS.ONLINE,
  },
};

const OrderParamsModel = types.model("OrderParamsModel", {
  price: types.number,
  lowerLimit: types.number,
  upperLimit: types.number,
  lnUpperLimit: types.number,
  lnLowerLimit: types.number,
  zeroConfEnabled: types.boolean,
  zeroConfMaxAmount: types.number,
  status: types.union(
    types.literal(STATUS.ONLINE),
    types.literal(STATUS.OFFLINE),
    types.literal(STATUS.APIERROR),
    types.literal(STATUS.NOT_FOUND),
    types.literal(STATUS.RATELIMIT),
    types.literal(STATUS.IPBLOCKED)
  ),
});

export interface IOrderParamsModel extends Instance<typeof OrderParamsModel> {}

export const ParamsStoreModel = types
  .model("ParamsStoreModel", {
    params: OrderParamsModel,
  })
  .actions((self) => ({
    setStatus: (
      newStatus: string,
      errorCode?: number,
      error?: string
    ): IOrderParamsModel => {
      const {
        orderStore: {
          order: { state },
        },
      } = getRoot(self);
      // we should ignore "insufficient funds" error if there is tracking order
      if (error === ERROR_CODES.INSUFFICIENT_FUNDS && state) {
        return self.params;
      }
      self.params = { ...self.params, status: newStatus };
      return self.params;
    },
  }))
  .actions((self) => ({
    fetchParams: flow(function* fetchParamsActions() {
      try {
        const response = yield getOrderParameters(self.setStatus);
        self.params = {
          price: parseFloat(response.data.price),
          lowerLimit: parseFloat(response.data.lower_limit),
          upperLimit: parseFloat(response.data.upper_limit),
          lnLowerLimit: parseFloat(response.data.ln_lower_limit || 0),
          lnUpperLimit: parseFloat(response.data.ln_upper_limit || 0),
          zeroConfMaxAmount: parseFloat(response.data.zero_conf_max_amount),
          zeroConfEnabled: response.data.zero_conf_enabled,
          status: STATUS.ONLINE,
        };
        return Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error.response);
      }
    }),
  }));

export interface IParamsStoreModel extends Instance<typeof ParamsStoreModel> {}

export function createStore(data = {}): IParamsStoreModel {
  const store = ParamsStoreModel.create({
    ...applySnapshot("ParamsStoreModel", ParamsStoreModel, {
      ...initialState,
      ...data,
    }),
  });
  saveSnapshot("ParamsStoreModel", store);
  return store;
}
