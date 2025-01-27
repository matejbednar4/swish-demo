// /customer-app/metro.config.js

const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Add the path to your /sdk folder
config.watchFolders = [
  ...config.watchFolders,
  path.resolve(__dirname, "../shared/sdk"), // Adjust this path if needed
  path.resolve(__dirname, "../shared/backend"), // Adjust this path if needed
];

// Add file extensions for SVGs
config.resolver = {
  ...config.resolver,
  assetExts: [...config.resolver.assetExts, "svg"], // Add 'svg' to asset extensions
  alias: {
    "@": path.resolve(__dirname, "./"),
  },
};

module.exports = config;
