export const buildMode = process.env['NODE_ENV'];
export const buildVersion =  process.env['BUILD_VERSION'];
export const isProduction = buildMode === "production" ? true : false;

export const CloudStorageUrlBase = `https://storage.googleapis.com/`;

export const CdnUrlBase = !isProduction  
    ? `http://localhost:4102/`
    : CloudStorageUrlBase + "tjandpals-cdn-eu/app/";