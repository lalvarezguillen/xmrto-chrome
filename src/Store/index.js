import ParamsStore from './params';
import OrderStore from './order';
import RouteStore from './router';

class RootStore {
  /**
   * Combine all MobX stores
   */
  constructor() {
    this.paramsStore = new ParamsStore(this);
    this.orderStore = new OrderStore(this);
    this.routeStore = new RouteStore(this);
  }
}

export default new RootStore();
