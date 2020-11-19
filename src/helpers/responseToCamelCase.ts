import toCamelCase from "./toCamelCase";

const RE_NUMBER = /^[+-]?((\.\d+)|(\d+(\.\d+)?))$/;

export default function responseToCamelCase(response: {
  [key: string]: string | number;
}): { [key: string]: string | number } {
  const ccResponse: { [key: string]: string | number } = {};
  Object.entries(response).forEach(([key, value]) => {
    const isNumber = RE_NUMBER.test(`${value}`);
    const CCKey = toCamelCase(key);
    ccResponse[CCKey] = isNumber ? parseFloat(`${value}`) : value;
  });
  return ccResponse;
}
