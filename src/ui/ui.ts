import {home} from "@ui/pages/home";
import {html} from "lit-html";
import "./ui.css";

export const ui = () => {
    const page = home();
    return html`
        <div class="base">
            ${page}
        </div>
    `;
}
