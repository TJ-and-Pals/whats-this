import {html} from "lit-html";
import {toggle_random_selector, get_random_selector} from "./random-selector-state";
import "./random-selector.css";

export const random_selector = () => {
    let box_class = "box";
    if(get_random_selector()) {
        box_class += " selected";
    }
    return html`
        <div @click=${toggle_random_selector} class="random-selector">
            <div class=${box_class}></div> Random
        </div>
        `;
}