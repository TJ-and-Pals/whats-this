import {html, nothing} from "lit-html";
import {CdnPath} from "@utils/path";
import {repeat} from 'lit-html/directives/repeat';
import "./pagination.css";

interface Props {
    total: number;
    current: number;
    onPage: (page:number) => unknown;
}

export const pagination = ({total, current, onPage}:Props) => {
    if(total < 2) {
        return html`${nothing}`;
    }

    const handle_left = () => onPage(Math.max(current-1, 0));
    const handle_right = () => onPage(Math.min(current+1, total));
    const handle_dot = onPage; 

    const xs = Array(total).fill(null).map((_, idx) => idx);


    const left_arrow_class = current > 0
        ? "left-arrow"
        : "left-arrow disabled";

    const right_arrow_class = current < total 
        ? "right-arrow"
        : "right-arrow disabled";

    const dot_name = idx => idx === current
        ? "dot"
        : "dot deselected";

    return html`
        <div class="pagination">
            <img @click=${handle_left} class=${left_arrow_class} src=${CdnPath.common("pagination/triangle-left.svg")} />
            <div class="middle-dots">
            ${
                repeat(xs, x => x, x => html`
                    <img @click=${() => handle_dot(x)} class=${dot_name(x)} src=${CdnPath.common(`pagination/circle.svg`)} />
                `) 
            }
            </div>
            <img @click=${handle_right} class=${right_arrow_class} src=${CdnPath.common("pagination/triangle-right.svg")} />
        </div>
    `
}