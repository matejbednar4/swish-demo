// /customer-app/metro.config.js

const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Add the path to your /sdk folder
config.watchFolders = [
  ...config.watchFolders,
  path.resolve(__dirname, "../sdk"), // Adjust this path if needed
];

// Add transformer configuration for handling SVGs
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

// Add file extensions for SVGs
config.resolver = {
  ...config.resolver,
  assetExts: [...config.resolver.assetExts, "svg"], // Add 'svg' to asset extensions
};

module.exports = config;
