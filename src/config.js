const api = 'https://xmr.to/api/v2/xmr2btc';

export default {
  api,
  decimalCount: 4,
  refreshOrderParamsInterval: 30000,
  refreshOrderDataInterval: 30000,
  block_time: 2,
  updown_api_key: 'ro-bzoa3apazj0wgt3gwt20',
  num_xmr_confirmations: [
    { min: 0.1, max: 5, confirmations: 1 },
    { min: 5, max: 10, confirmations: 2 },
    { min: 10, max: 15, confirmations: 3 },
    { min: 15, max: 20, confirmations: 4 },
    { min: 20, max: Infinity, confirmations: 5 },
  ],
  notification_auto_dismiss: 15000, // ms
};
