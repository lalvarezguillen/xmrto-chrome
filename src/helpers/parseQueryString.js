// eslint-disable-next-line
function parseQueryString(str) {
  const string = str.charAt(0) === '?' ? str.slice(1) : str;
  const arr = string.split('&');
  const res = {};
  arr.forEach((item) => {
    const pair = item.split('=');
    res[pair[0]] = pair[1];
  });
  return res;
}

export default parseQueryString;
