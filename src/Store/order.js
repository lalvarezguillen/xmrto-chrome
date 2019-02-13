import { observable, decorate, action } from 'mobx';
import { createOrder, createOrderPP, getOrderStatus } from '../services';

const defaultProps = {
  btcAmount: 0,
  btcDestAddress: '',
  state: '',
  uuid: '',
  btcNumConfirmations: 0,
  btcTransactionId: '',
  btcNumConfirmationsBeforePurge: 0,
  xmrAmountTotal: 0,
  xmrAmountRemaining: 0,
  xmrPriceBtc: 0,
  xmrReceivingIntegratedAddress: '',
  xmrRequiredPaymentIdLong: '',
  xmrReceivingAddress: '',
  secondsTillTimeout: 0,
  xmrNumConfirmationsRemaining: 0,
};

/**
 * MobX store
 */
class OrderStore {
  order = { ...defaultProps };
  /**
   * Method to create order
   */
  fetchOrder = (data) => getOrderStatus(data)
    .then(({ data }) => this.setData(data))
    .catch((resp) => {
      if (resp.response.status === 400 || resp.response.status === 404) {
        this.setData({ state: 'NOT_FOUND', ...data });
      }
      throw resp.response;
    });
  /**
   * Method to create order
   */
  createOrder = (data) => {
    const requestMethod = data.pp_url ? createOrderPP : createOrder;
    return requestMethod(data)
      .then(({ data }) => this.setData(data))
      // .then(this.setData)
      .catch((resp) => {
        if (resp.response.status === 400) {
          this.setData({ state: 'NOT_FOUND', ...data })
        }
        throw resp.response;
      })
  };
  clearOrder = () => {
    this.order = { ...defaultProps };
  };
  setBTCAddress = (address) => {
    this.order = { ...this.order, btcDestAddress: address };
  };
  setData = (order) => {
    this.order = {
      ...this.order,
      btcAmount: order.btc_amount,
      btcDestAddress: order.btc_dest_address,
      state: order.state,
      uuid: order.uuid,
      btcNumConfirmations: order.btc_num_confirmations || defaultProps.btcNumConfirmations,
      btcTransactionId: order.btc_transaction_id || defaultProps.btcTransactionId,
      btcNumConfirmationsBeforePurge: order.btc_num_confirmations_before_purge || defaultProps.btcNumConfirmationsBeforePurge,
      xmrAmountTotal: order.xmr_amount_total || defaultProps.xmrAmountTotal,
      xmrAmountRemaining: order.xmr_amount_remaining || defaultProps.xmrAmountRemaining,
      xmrPriceBtc: order.xmr_price_btc || defaultProps.xmrPriceBtc,
      xmrReceivingIntegratedAddress: order.xmr_receiving_integrated_address || defaultProps.xmrReceivingIntegratedAddress,
      xmrRequiredPaymentIdLong: order.xmr_required_payment_id_long || defaultProps.xmrRequiredPaymentIdLong,
      xmrReceivingAddress: order.xmr_receiving_address || defaultProps.xmrReceivingAddress,
      secondsTillTimeout: order.seconds_till_timeout || defaultProps.secondsTillTimeout,
      xmrNumConfirmationsRemaining: order.xmr_num_confirmations_remaining || defaultProps.xmrNumConfirmationsRemaining,
    };
    return order;
  };
}

decorate(OrderStore, {
  order: observable,
  setData: action,
  setBTCAddress: action,
  clearOrder: action,
});

export default OrderStore;
