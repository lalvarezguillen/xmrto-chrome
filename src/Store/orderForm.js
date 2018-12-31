import { observable, decorate, action } from 'mobx';

/**
 * MobX store
 */
class OrderFormStore {
  address = '';
  usePP = false;
  amount = 0;
  changeAddress = (address) => {
    this.address = address;
  };
  changeType = (type) => {
    const values = {
      pp: true,
      address: false,
    };
    this.usePP = !!values[type];
  };
  changeAmount = (amount) => {
    this.amount = amount;
  };
}

decorate(OrderFormStore, {
  address: observable,
  usePP: observable,
  amount: observable,
  onAddressChange: action,
  onTypeChange: action,
  onAmountChange: action,
});

export default OrderFormStore;
