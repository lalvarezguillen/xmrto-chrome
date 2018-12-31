import ParamsStore from './params';
import OrderStore from './order';
import RouteStore from './router';
import OrderFormStore from './orderForm';

class RootStore {
  /**
   * Combine all MobX stores
   */
  constructor() {
    this.paramsStore = new ParamsStore(this);
    this.orderStore = new OrderStore(this);
    this.routeStore = new RouteStore(this);
    this.orderFormStore = new OrderFormStore(this);
  }
}

export default new RootStore();
