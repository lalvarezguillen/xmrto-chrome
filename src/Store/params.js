import { observable, decorate, action } from 'mobx';
import { getOrderParameters } from '../services';
import { STATUS } from "../constants";

/**
 * MobX store
 */
class paramsStore {
  params = {
    lowerLimit: 0,
    price: 0,
    upperLimit: 0,
    zeroConfEnabled: 0,
    zeroConfMaxAmount: 0,
    status: STATUS.ONLINE,
    netType: 'mainnet',
  };
  /**
   * Method to fetch params
   */
  fetchParams = () => getOrderParameters()
    .then(({ data }) => this.setData(data))
    // .then(this.setData)
    .catch((resp) => {
      throw resp.response;
    });
  setData = (data) => {
    this.params = {
      ...this.params,
      lowerLimit: data.lower_limit,
      price: data.price,
      upperLimit: data.upper_limit,
      zeroConfEnabled: data.zero_conf_enabled,
      zeroConfMaxAmount: data.zero_conf_max_amount,
    };
    return this.params;
  };
  setStatus = (status) => {
    this.params = { ...this.params, status };
  };
  setNetType = (netType) => {
    this.params = { ...this.params, netType };
  }
}

decorate(paramsStore, {
  params: observable,
  status: observable,
  setData: action,
  setStatus: action,
  setNetType: action,
});

export default paramsStore;
