module.exports.getToken = (tokenInfo, tokenKey) => {
  const [key, value] = tokenInfo.split("~");
  if (key.trim() === `${tokenKey}`) {
    token = value.trim();
  }

  return token;
};

module.exports.checkRequiredProperties = (keys, data = {}) => {
  if (!Array.isArray(keys) || !keys.length || !Object.keys(data).length) {
    return false;
  }

  const isSatisfied = keys.every((key) => data.hasOwnProperty(key));
  return isSatisfied;
};
