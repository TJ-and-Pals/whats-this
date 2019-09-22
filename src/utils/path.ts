import {CdnUrlBase} from "@config/config";

export const CdnPath = (() => {

    const common = (path: string) => {
        return CdnUrlBase + "apps/common/" + path; 
    };
    const root = (path: string) => {
        return CdnUrlBase + "apps/whats-this/" + path; 
    };

    return {root, common};
})();