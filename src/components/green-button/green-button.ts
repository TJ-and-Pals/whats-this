import {html} from "lit-html";
import "./green-button.css";

interface Props {
    onSelect?: () => any;
    onHover?: () => any;
    onHoverOut?: () => any;
}

export const button = (classes:string) => (label:string) => ({onSelect, onHover, onHoverOut}:Props) => html`
    <div class=${classes} @click=${onSelect} @mouseover=${onHover} @mouseout=${onHoverOut}>
        ${label}
    </div>
`;



