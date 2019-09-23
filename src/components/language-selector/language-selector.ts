import {html} from "lit-html";
import {circle_selector} from "@components/circle-selector/circle-selector";
import "./language-selector.css"
const onChange = (language: "english" | "zulu") => (flag:boolean) => {
}
export const language_selector = () => html`
    <div class="language-selector">
        ${circle_selector (onChange("english")) ("English") (true)}
        ${circle_selector (onChange("zulu")) ("Zulu") (false)}
    </div>
`