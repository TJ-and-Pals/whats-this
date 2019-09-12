import {render, html} from "lit-html";
import {ui} from "@ui/ui";

const domTarget = document.getElementById("app");


const onTick = (now:number) => {
    requestAnimationFrame(onTick);
    render(ui(), domTarget);
}
requestAnimationFrame(onTick);