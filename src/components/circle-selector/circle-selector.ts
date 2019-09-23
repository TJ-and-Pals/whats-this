import {html} from "lit-html";
import {classMap} from "lit-html/directives/class-map";
import "./circle-selector.css";

export const circle_selector = (onChange:(flag:boolean) => unknown) => (label:string) => (active:boolean) => 
    html`
        <div class="circle-selector" @change=${() => onChange(!active)}>
            <div class="circle-outer">
                ${active ? html`<div class="circle-inner"></div>` : null}
            </div>
            <div>${label}</div>
        </div>
    `;
