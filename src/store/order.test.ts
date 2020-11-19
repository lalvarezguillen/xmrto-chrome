import { OrderStoreModel, initialState, IOrderStoreModel } from "./order";
import orderMock from "../__mock__/order";

jest.mock("../services", () => ({
  getOrderStatus: () =>
    Promise.resolve({ data: require("../__mock__/order").default }),
}));

let orderStore: IOrderStoreModel = OrderStoreModel.create(initialState);

describe("Order", () => {
  beforeEach(() => {
    orderStore = OrderStoreModel.create(initialState);
  });
  it("Has correct initial values", () => {
    expect(orderStore).toEqual(initialState);
  });
  it('"setOrderDestAddress" should set order destination address', () => {
    orderStore.setOrderDestAddress("test_address");
    expect(orderStore.order.btcDestAddress).toEqual("test_address");
  });
  it('"fetchOrder" should fetch order data', async () => {
    await orderStore.fetchOrder({ uuid: "order-uuid" });
    expect(orderStore.order.uuid).toEqual(orderMock.uuid);
    expect(orderStore.order.btcNumConfirmations).toEqual(0);
    expect(orderStore.order.btcTransactionId).toEqual("");
  });
});
