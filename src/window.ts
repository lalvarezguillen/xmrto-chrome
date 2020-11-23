export {};
declare global {
  interface Window {
    // eslint-disable-next-line
    chrome: any;
    renderReactApp: ({
      address,
      networkType,
    }: {
      address: string;
      networkType: string;
    }) => void;
  }
}
