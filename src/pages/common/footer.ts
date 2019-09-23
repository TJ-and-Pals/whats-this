import {html, TemplateResult} from "lit-html";
import "./footer.css"
import { CdnPath } from "@utils/path";

interface Props {
    left?: TemplateResult;
    right?: TemplateResult;
}
export const footer = (props?:Props) => {
    const left = props != null && props.left != null ? props.left : null;
    const right = props != null && props.right != null ? props.right: null;
    return html`
    <footer class="main-footer">
        <div class="grid">
            <div>
                ${left}
            </div>
            <div>
                <img class="logo" src=${CdnPath.common("tj-logo-footer.png")} />
            </div>
            <div>
                ${right}
            </div>
        </div>
    </footer>
    `
}