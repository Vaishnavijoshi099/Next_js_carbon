// next.config.js
const nextI18NextConfig = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: nextI18NextConfig.i18n,
};
