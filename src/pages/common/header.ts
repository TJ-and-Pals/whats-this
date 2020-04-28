import {html} from "lit-html";
import "./header.css"
import { CdnPath } from "@utils/path";
import {set_language, get_language} from "@components/language-selector/language-selector-state";
import {router_service} from "@components/router/router-state";
export const header = () => {
    const lang = get_language();

    const header = lang === "zulu" ? "Funda Amagama!" : "Learn Words!";

    const on_home = () => router_service.send("HOME");

    return html`
        <header class="main-header">
            <img class="logo" src=${CdnPath.common("tj-logo-header.png")} @click=${on_home} />
            <div class="text ${lang}">${header}</div>
        </header>
    `;
}