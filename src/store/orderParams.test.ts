import {
  ParamsStoreModel,
  initialState,
  IParamsStoreModel,
} from "./orderParams";
import orderParamsMock from "../__mock__/orderParams";
import { STATUS } from "../constants";

jest.mock("../services", () => ({
  getOrderParameters: () =>
    Promise.resolve({ data: require("../__mock__/orderParams").default }),
}));

let paramsStore: IParamsStoreModel = ParamsStoreModel.create(initialState);

describe("Order params", () => {
  beforeEach(() => {
    paramsStore = ParamsStoreModel.create(initialState);
  });
  it("Has correct initial values", () => {
    expect(paramsStore).toEqual(initialState);
  });
  it('"setStatus" changes status', () => {
    paramsStore.setStatus(STATUS.OFFLINE);
    expect(paramsStore.params.status).toEqual(STATUS.OFFLINE);
  });
  it('"fetchParams" should fetch params', async () => {
    await paramsStore.fetchParams();
    expect(paramsStore.params).toEqual({
      price: parseFloat(orderParamsMock.price),
      lowerLimit: parseFloat(orderParamsMock.lower_limit),
      upperLimit: parseFloat(orderParamsMock.upper_limit),
      lnLowerLimit: parseFloat(orderParamsMock.ln_lower_limit || "0"),
      lnUpperLimit: parseFloat(orderParamsMock.ln_upper_limit || "0"),
      zeroConfMaxAmount: parseFloat(orderParamsMock.zero_conf_max_amount),
      zeroConfEnabled: orderParamsMock.zero_conf_enabled,
      status: STATUS.ONLINE,
    });
  });
});
