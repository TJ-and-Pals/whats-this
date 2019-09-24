import {html, TemplateResult} from "lit-html";
import "./footer.css"
import { CdnPath } from "@utils/path";
import {router_service} from "@components/router/router-state";

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
                <img class="logo" src=${CdnPath.common("bottom-bar/tj-logo-small.png")} />
            </div>
            <div>
                ${right}
            </div>
        </div>
    </footer>
    `
}

interface LeftProps {
    on_left_arrow?: () => unknown; 
    home?: boolean; 
}

export const footer_left = ({on_left_arrow, home}:LeftProps) => {
    const on_home = () => router_service.send("HOME");

    return html`
        <div class="left">
            ${on_left_arrow && footer_arrow_left(on_left_arrow)}
            ${home && html`
                <img class="home-icon" @click=${on_home} src=${CdnPath.common("bottom-bar/home.svg")} />
            `}
        </div>
    `
}

export const footer_arrow_left = (on_click:() => unknown) => html`
    <img class="arrow-icon left" @click=${on_click} src=${CdnPath.common("bottom-bar/arrow-left.svg")} />
    `;

export const footer_arrow_right = (on_click:() => unknown) => html`
    <img class="arrow-icon right" @click=${on_click} src=${CdnPath.common("bottom-bar/arrow-right.svg")} />
    `;