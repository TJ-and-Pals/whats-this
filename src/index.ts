import {render, html} from "lit-html";
import {home} from "@pages/home/home";
import {menu} from "@pages/menu/menu";
import {game} from "@pages/game/game";
import {ifState} from "@utils/xstate";
import {router_service} from "@components/router/router-state";
import {set_stage_state} from "@components/stage/stage-state";
import {stage} from "@components/stage/stage-view";
import {STAGE_WIDTH, STAGE_HEIGHT} from "@config/config";
import * as L from "partial.lenses";
import "./index.css";

const appElement = document.getElementById("app");
const rootElement = document.documentElement;

const onTick = (now:number) => {
    requestAnimationFrame(onTick);

    const page = ifState({
        home,
        menu,
        game
    }) (router_service.state);

    render(stage(page), appElement);
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
   
    const scale = width / STAGE_WIDTH;
    const x = (window.innerWidth - width) / 2;
    const y = (window.innerHeight- height) / 2;
    set_stage_state({
        x,
        y,
        width,
        height,
        scale
    });

    rootElement.style.setProperty('font-size', `${17 * scale}px`);
    rootElement.style.setProperty('--scale', `${scale}`);
    rootElement.style.setProperty('--stage-x', `${x}px`);
    rootElement.style.setProperty('--stage-y', `${y}px`);
    rootElement.style.setProperty('--stage-width', `${width}px`);
    rootElement.style.setProperty('--stage-height', `${height}px`);

}


window.onresize = resizeApp;
resizeApp();