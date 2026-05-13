// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// expo-sqlite's web build (wa-sqlite) ships a .wasm binary that Metro must
// resolve as an asset, not a JS module.
config.resolver.assetExts.push('wasm');

// SharedArrayBuffer is required by expo-sqlite on web; browsers only expose
// it when the dev server sends COOP/COEP headers. Harmless on native.
config.server.enhanceMiddleware = (middleware) => {
  return (req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
    middleware(req, res, next);
  };
};

module.exports = config;
