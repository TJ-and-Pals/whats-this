import {html} from "lit-html";
import "./header.css"
import { CdnPath } from "@utils/path";
import {set_language, get_language} from "@components/language-selector/language-selector-state";
export const header = () => {
    const lang = get_language();

    const header = lang === "zulu" ? "Funda Amagama!" : "Learn Words!";

    return html`
        <header class="main-header">
            <img class="logo" src=${CdnPath.common("tj-logo-header.png")} />
            <div class="text ${lang}">${header}</div>
        </header>
    `;
}