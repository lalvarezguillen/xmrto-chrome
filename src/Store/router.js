import { observable, decorate, action } from 'mobx';

/**
 * MobX store
 */
class routeStore {
  route = 0;
  changeRoute = (route) => {
    this.route = route;
  };
}

decorate(routeStore, {
  route: observable,
  changeRoute: action,
});

export default routeStore;
