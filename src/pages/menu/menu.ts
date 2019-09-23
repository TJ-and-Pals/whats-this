import {html} from "lit-html";
import {CdnPath} from "@utils/path";
import {header} from "@pages/common/header";
import {footer} from "@pages/common/footer";
import {language_selector} from "@components/language-selector/language-selector";
import {green_button} from "@components/green-button/green-button";
import "./menu.css";

const onSelect = () => {
}

export const menu = () => {
    return html`
        ${header()}
        <div class="menu">
            <header>MENU PAGE HERE!</header>
        </div>
        ${footer({right: language_selector()})}
    `
}
