// /customer-app/metro.config.js

const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add the path to your /sdk folder
config.watchFolders = [
  ...config.watchFolders,
  require("path").resolve(__dirname, "../sdk"), // Adjust this path if needed
];

module.exports = config;
