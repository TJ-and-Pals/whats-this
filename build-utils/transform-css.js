//If you change it here - also change:
//1. config/Config.ts
//2. build-utils/localcdn.js

const CDN_HOST = process.env['NODE_ENV'] === "production"
    ? "https://storage.googleapis.com/tjandpals-cdn-eu/app/whats-this"
    : "http://localhost:4102";

const CDN_ASSETS = CDN_HOST + "/assets";
const CDN_UI = CDN_ASSETS + "/ui";

module.exports = function (rawString) {
  return rawString 
        .replace(/%CDN_ASSETS%/g, CDN_ASSETS)
        .replace(/%CDN_HOST%/g, CDN_HOST)
        .replace(/%CDN_UI%/g, CDN_UI);
}