const stringReduce = (str, first, last) => {
  if (str.length > first + last + 3) {
    return `${str.slice(0, first)}...${str.slice(-last)}`;
  }
  return str;
};

export default stringReduce;
