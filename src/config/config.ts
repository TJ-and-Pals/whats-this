export const buildMode = process.env['NODE_ENV'];
export const buildVersion =  process.env['BUILD_VERSION'];
export const isProduction = buildMode === "production" ? true : false;

const CloudStorageUrlBase = `https://storage.googleapis.com/`;

//const CDN_HOST = process.env['PLATFORM'] === "electron" ? "cdn/"
export const CdnUrlBase = process.env['PLATFORM'] === "electron" ? "/cdn/"
    : !isProduction  ? `http://localhost:4102/`
    : CloudStorageUrlBase + "tjandpals-cdn-eu/";

export const STAGE_WIDTH = 1024;
export const STAGE_HEIGHT = 768;