require('dotenv').config();

if(!process.env.DEVELOPER || process.env.DEVELOPER === "") {
    console.log("Local CDN: set [DEVELOPER] in .env");
    process.exit(0);
}

const paths = {
    david: (osPlatform) => {
        switch(osPlatform) {
            case "linux": return `/dropbox/container/Dropbox (Personal)/TJANDPALS/tj-cdn`
            default: return `D:\\Dropbox (Personal)\\TJANDPALS\\tj-cdn`
        }
    },
    avraham: (osPlatform) => {
        switch(osPlatform) {
            case "linux": return `/dropbox/container/Dropbox (Personal)/TJANDPALS/tj-cdn`
            default: return `C:\\Users\\Nacher\\Dropbox\\tj-cdn`
        }
    },
}

const os = require('os');
const path = require('path');
const fs = require('fs');

const localPath = path.resolve(
    paths[process.env.DEVELOPER.toLowerCase()] (os.platform())
);

if(process.argv[2] !== "--copy") {
    const express = require('express');
    const cors = require('cors');
    const serveIndex = require('serve-index');

    const app = express();

    app.options('*', cors());
    app.use(cors());
    app.use(express.static(localPath), serveIndex(localPath, {'icons': true}));


    //If you change it here - also change:
    //1. config/Config.ts
    //2. build-utils/transform-css.js
    app.listen(4102, () => console.log('Local CDN Started!'))
} else {
    //adapted from https://stackoverflow.com/a/22185855/784519
    const copyRecursiveSync = function(src, dest) {
        const exists = fs.existsSync(src);
        const stats = exists && fs.statSync(src);
        const isDirectory = exists && stats.isDirectory();
        if (exists && isDirectory) {
            fs.mkdirSync(dest, {recursive: true});
            fs.readdirSync(src).forEach(function(childItemName) {
                copyRecursiveSync(path.join(src, childItemName),
                                    path.join(dest, childItemName));
            });
        } else {
            fs.copyFileSync(src, dest);    // UPDATE FROM:    fs.linkSync(src, dest);
        }
    };

    /**
     * only copy common and whats-this
     * not the entire cdn folder since it may have other apps
     */
    copyRecursiveSync(
        path.join(localPath, "apps", "common"),
        path.join(process.cwd(), "dist", "cdn", "apps", "common")
    );

    
    copyRecursiveSync(
        path.join(localPath, "apps", "whats-this"),
        path.join(process.cwd(), "dist", "cdn", "apps", "whats-this")
    );
}
