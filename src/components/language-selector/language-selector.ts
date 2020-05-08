import {html} from "lit-html";
import {circle_selector} from "@components/circle-selector/circle-selector";
import "./language-selector.css";
import {set_language, get_language} from "./language-selector-state";

const onSelect = (language: "english" | "zulu") => () => {
    set_language(language);
}
export const language_selector = () => {
    const lang = get_language();

    const english_label = lang === "english" ? "English" : "isiNgisi";
    const zulu_label = lang === "english" ? "Zulu" : "isiZulu";

    return html`
        <div class="language-selector">
            ${circle_selector (onSelect("english")) (english_label) (lang === "english")}
            ${circle_selector (onSelect("zulu")) (zulu_label) (lang === "zulu")}
        </div>
    `;
}

