const api: { [key: string]: string } = {
  mainnet: "https://xmr.to/api/v3/xmr2btc",
  stagenet: "https://test.xmr.to/api/v3/xmr2btc",
};

type Config = {
  api: string;
  refreshOrderParamsInterval: number;
  refreshOrderDataInterval: number;
  block_time: number;
  num_xmr_confirmations: Array<{
    min: number;
    max: number;
    confirmations: number;
  }>;
  setAPI: (type: string) => string;
};

const config: Config = {
  api: api.stagenet,
  refreshOrderParamsInterval: 30000,
  refreshOrderDataInterval: 5000,
  block_time: 2,
  num_xmr_confirmations: [{ min: 0.1, max: Infinity, confirmations: 1 }],
  setAPI(type) {
    this.api = api[type];
    return this.api;
  },
};

export default config;
