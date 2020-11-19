import { useContext, createContext } from "react";
import { types, Instance } from "mobx-state-tree";
import "./utils";

import {
  ParamsStoreModel,
  createStore as createParamsStore,
} from "./orderParams";
import { OrderStoreModel, createStore as createOrderStore } from "./order";

const RootModel = types.model({
  paramsStore: ParamsStoreModel,
  orderStore: OrderStoreModel,
});

export const rootStore = RootModel.create({
  paramsStore: createParamsStore(),
  orderStore: createOrderStore(),
});

// Next line is needed for testing purpose
// @ts-ignore
window.rootStore = rootStore;

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useMst(): RootInstance {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
