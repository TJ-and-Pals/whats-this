import {html} from "lit-html";
import "./header.css"
import { CdnPath } from "@utils/path";

export const header = () => html`
    <header class="main-header">
        <img class="logo" src=${CdnPath.common("tj-logo-header.png")} />
        <div class="text">Learn Words!</div>
    </header>
`;