import {html} from "lit-html";
import {CdnPath} from "@utils/path";

import "./home.css";

export const home = () => html`
    <div class="home-page-container">
        <div class="home-page-hello">
            Hello World!
            <img src=${CdnPath.root("house.jpg")} />
        </div>
    </div>
`