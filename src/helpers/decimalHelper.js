// eslint-disable-next-line
function decimalHelper(value = 0, count = 0) {
  const reduced = parseFloat(value).toFixed(count);
  return parseFloat(reduced).toString();
}

export default decimalHelper;
