import {html} from "lit-html";
import {circle_selector} from "@components/circle-selector/circle-selector";
import "./language-selector.css";
import {set_language, get_language} from "./language-selector-state";

const onSelect = (language: "english" | "zulu") => () => {
    set_language(language);
}
export const language_selector = () => {
    const lang = get_language();
    return html`
        <div class="language-selector">
            ${circle_selector (onSelect("english")) ("English") (lang === "english")}
            ${circle_selector (onSelect("zulu")) ("Zulu") (lang === "zulu")}
        </div>
    `;
}