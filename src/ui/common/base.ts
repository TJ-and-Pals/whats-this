import {html} from "lit-html";
import "./base.css"
import { CdnPath } from "@utils/path";

export const base = (children:any) => {
    return html`
        <div class="base">
            ${header()}
            ${children}
        </div>
    `
}

const header = () => html`
    <header>
        <img class="logo" src=${CdnPath.common("header-logo.svg")} />
        <div class="text">Learn Words!</div>
    </header>
`;