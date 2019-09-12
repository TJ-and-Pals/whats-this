import {home} from "@ui/pages/home";
import {html} from "lit-html";
import "./ui.css";

export const ui = () => html`
    <div class="ui">
        ${home()}
    </div>
`