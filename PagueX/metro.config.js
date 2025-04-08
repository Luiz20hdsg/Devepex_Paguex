// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.server = {
  ...config.server,
  experimentalImportBundleSupport: false,
};

module.exports = config;