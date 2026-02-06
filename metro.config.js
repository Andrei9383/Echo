const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const { assetExts, sourceExts } = config.resolver;

config.transformer.babelTransformerPath = require.resolve("./sql-transformer");

config.resolver.assetExts = assetExts.filter((ext) => ext !== "sql");
config.resolver.sourceExts = [...new Set([...sourceExts, "sql"])];

module.exports = config;
