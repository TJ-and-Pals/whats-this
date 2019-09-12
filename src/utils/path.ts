import {CdnUrlBase} from "@config/config";

export const CdnPath = (() => {

    const root = (path: string) => {
        return CdnUrlBase + "whats-this/" + path; 
    };

    return {root};
})();