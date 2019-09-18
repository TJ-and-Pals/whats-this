import {html} from "lit-html";
import {CdnPath} from "@utils/path";

import "./home.css";

export const home = () => {
    return html`
    <div class="home">
        <img class="home-tj" src=${CdnPath.root("tj-graduate.svg")} />
    </div>
`
}