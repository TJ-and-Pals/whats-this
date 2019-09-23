import {html} from "lit-html";
import "./green-button.css";

export const green_button = (onClick:() => unknown) => (label:string) => html`
    <div class="green-button" @click=${onClick}>
        ${label}
    </div>
`
