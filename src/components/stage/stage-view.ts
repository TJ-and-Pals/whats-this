import {html} from "lit-html";
import {styleMap} from 'lit-html/directives/style-map';
import {get_stage_state} from "./stage-state";
import "./stage.css";

export const stage = (children:any) => {
    const {x, y, width, height} = get_stage_state();
    const styles = {
        width: `${width}px`,
        height: `${height}px`,
        left: `${x}px`,
        top: `${y}px`,
    }
    return html`
        <div class="stage" style=${styleMap(styles)} >
            ${children}
        </div>
    `
}