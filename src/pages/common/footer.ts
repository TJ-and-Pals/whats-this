import {html, TemplateResult} from "lit-html";
import "./footer.css"
import { CdnPath } from "@utils/path";
import {router_service} from "@components/router/router-state";
import { classMap } from "lit-html/directives/class-map";

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
    left_of_home?: any
    home?: boolean; 
    home_is_first?: boolean; 
}

export const footer_left = ({left_of_home, home, home_is_first}:LeftProps) => {
    const on_home = () => router_service.send("HOME");

    return html`
        <div class="left">
            ${left_of_home}
            ${home && html`
                <img class=${classMap({"home-icon": true, first: home_is_first})} @click=${on_home} src=${CdnPath.common("bottom-bar/home.svg")} />
            `}
        </div>
    `
}

export const footer_arrow_left = (on_click:() => unknown) => {
    let classes = `arrow-icon left`;
    if(!on_click) {
        classes += ` disabled`;
    }
    return html`
        <img class=${classes} @click=${on_click} src=${CdnPath.common("bottom-bar/arrow-left.svg")} />
    `;
}

export const footer_arrow_right = (on_click:() => unknown) => {
    let classes = `arrow-icon right`;
    if(!on_click) {
        classes += ` disabled`;
    }
    return html`
        <img class=${classes} @click=${on_click} src=${CdnPath.common("bottom-bar/arrow-right.svg")} />
    `;
}