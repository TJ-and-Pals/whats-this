import {CdnUrlBase} from "@config/config";

export const CdnPath = (() => {

    const common = (path: string) => {
        return CdnUrlBase + "common/" + path; 
    };
    const root = (path: string) => {
        return CdnUrlBase + "app/whats-this/" + path; 
    };

    return {root, common};
})();