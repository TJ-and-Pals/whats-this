import {render, html} from "lit-html";
import {ui} from "@ui/ui";
import {update_state} from "@state/state";
import {home} from "@ui/pages/home";
import {menu} from "@ui/pages/menu";
import {ifState} from "@utils/xstate";
import {router_service} from "@state/router";
import {STAGE_WIDTH, STAGE_HEIGHT} from "@config/config";
import * as L from "partial.lenses";
import "./index.css";

const appElement = document.getElementById("app");
const uiElement = document.getElementById("ui");
const rootElement = document.documentElement;

const onTick = (now:number) => {
    requestAnimationFrame(onTick);

    const page = ifState({
        home,
        menu
    }) (router_service.state);

    render(ui(page), uiElement);
}
requestAnimationFrame(onTick);



export const resizeApp = () => {
    const targetRatio = STAGE_WIDTH / STAGE_HEIGHT;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const windowRatio = width / height;

    if (windowRatio > targetRatio ) {
        width = height * targetRatio;
    } else {
        height = width / targetRatio;
    }
   
    appElement.style.width = `${width}px`;
    appElement.style.height= `${height}px`;
    appElement.style.top = `${(window.innerHeight - height) / 2}px`;
    appElement.style.left = `${(window.innerWidth - width) / 2}px`;

    const scale = width / STAGE_WIDTH;

    rootElement.style.setProperty('font-size', `${17 * scale}px`);
    rootElement.style.setProperty('--scale', `${scale}`);

    update_state(L.set("scale")(scale));
}


window.onresize = resizeApp;
resizeApp();