import {html} from "lit-html";
import {CdnPath} from "@utils/path";
import {header} from "@ui/common/header";
import {footer} from "@ui/common/footer";
import {language_selector} from "@ui/components/language-selector/language-selector";
import {green_button} from "@ui/components/green-button/green-button";
import "./home.css";

const onSelect = () => {
}
export const home = () => {
    return html`
        ${header()}
        <div class="home">
            <img class="home-tj" src=${CdnPath.root("tj-graduate.png")} />
            <div class="banner-text">
                <div class="small">TJ's</div>
                <div class="large">WHAT'S THIS?</div>
                <div class="small">Game</div>
            </div>
                <div class="grade-buttons">
                    <div>
                        ${green_button(onSelect) ("Grade RR")}
                    </div>
                    <div>
                        ${green_button(onSelect) ("Grade R")}
                    </div>
                </div>
        </div>
        ${footer({right: language_selector()})}
    `
}
