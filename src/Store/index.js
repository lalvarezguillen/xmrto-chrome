import ParamsStore from './params';
import OrderStore from './order';

class RootStore {
  /**
   * Combine all MobX stores
   */
  constructor() {
    this.paramsStore = new ParamsStore(this);
    this.orderStore = new OrderStore(this);
  }
}

const store = new RootStore();
window.store = store;
export default store;
