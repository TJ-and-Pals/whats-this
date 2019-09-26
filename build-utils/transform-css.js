const CDN_HOST = process.env['PLATFORM'] === "electron" ? "/cdn" 
    : process.env['NODE_ENV'] === "production" ? "https://storage.googleapis.com/tjandpals-cdn-eu"
    : "http://localhost:4102";

const CDN_ROOT = CDN_HOST + "/apps/whats-this";
const CDN_COMMON = CDN_HOST + "/apps/common";

module.exports = function (rawString) {
  return rawString 
        .replace(/%CDN_ROOT%/g, CDN_ROOT)
        .replace(/%CDN_COMMON%/g, CDN_COMMON)
}