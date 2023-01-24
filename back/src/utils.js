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
