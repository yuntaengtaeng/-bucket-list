module.exports.getToken = (cookie, type) => {
  const token = (cookie || '').split(';').reduce((token, cookie) => {
    const [key, value] = cookie.split('=');
    if (key === `${type}`) {
      token = value.trim();
    }

    return token;
  }, '');

  return token;
};

module.exports.checkRequiredProperties = (keys, data = {}) => {
  if (!Array.isArray(keys) || !keys.length || !Object.keys(data).length) {
    return false;
  }

  const isSatisfied = keys.every((key) => data.hasOwnProperty(key));
  return isSatisfied;
};
