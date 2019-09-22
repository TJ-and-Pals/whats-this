import {html} from "lit-html";
import {CdnPath} from "@utils/path";
import {header} from "@ui/common/header";
import {footer} from "@ui/common/footer";
import {language_selector} from "@ui/components/language-selector/language-selector";
import {green_button} from "@ui/components/green-button/green-button";
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
