import {html} from "lit-html";
import {toggle_random_selector, get_random_selector} from "./random-selector-state";
import "./random-selector.css";
import { get_language } from "../language-selector/language-selector-state";

export const random_selector = () => {
    let box_class = "box";
    if(get_random_selector()) {
        box_class += " selected";
    }

    const lang = get_language();

    const label = lang == "zulu" ? "Okungahleliwe" : "Random";

    return html`
        <div @click=${toggle_random_selector} class="random-selector">
            <div class=${box_class}></div> 
            ${label} 
         </div>
        `;
}