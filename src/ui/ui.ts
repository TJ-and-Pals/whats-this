import {html} from "lit-html";
import "./ui.css";

export const ui = (page) => {
    return html`
        <div class="base">
            ${page}
        </div>
    `;
}
