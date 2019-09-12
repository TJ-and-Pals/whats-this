require('dotenv').config();

if(!process.env.DEVELOPER || process.env.DEVELOPER === "") {
    console.log("Local CDN: set [DEVELOPER] in .env");
    process.exit(0);
}

const paths = {
    david: (osPlatform) => {
        switch(osPlatform) {
            case "linux": return `/dropbox/container/Dropbox (Personal)/TJANDPALS/SA Test Pilot/Apps/Common/cdn/app`
            default: return `D:\\Dropbox (Personal)\\TJANDPALS\\SA Test Pilot\\Apps\\Common\\cdn\\app`
        }
    },
}

const os = require('os');
const express = require('express');
const path = require('path');
const fs = require('fs');
const serveIndex = require('serve-index');
const cors = require('cors');

const localPath = path.resolve(
    paths[process.env.DEVELOPER.toLowerCase()] (os.platform())
);

const app = express();

app.options('*', cors());
app.use(cors());
app.use(express.static(localPath), serveIndex(localPath, {'icons': true}));


//If you change it here - also change:
//1. config/Config.ts
//2. build-utils/transform-css.js
app.listen(4102, () => console.log('Local CDN Started!'))
