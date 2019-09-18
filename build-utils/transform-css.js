//If you change it here - also change:
//1. config/Config.ts
//2. build-utils/localcdn.js

const CDN_HOST = process.env['NODE_ENV'] === "production"
    ? "https://storage.googleapis.com/tjandpals-cdn-eu"
    : "http://localhost:4102";

const CDN_ROOT = CDN_HOST + "/app/whats-this";
const CDN_COMMON = CDN_HOST + "/common";

module.exports = function (rawString) {
  return rawString 
        .replace(/%CDN_ROOT%/g, CDN_ROOT)
        .replace(/%CDN_COMMON%/g, CDN_COMMON)
}