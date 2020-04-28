import {html} from "lit-html";
import {CdnPath} from "@utils/path";
import {router_service} from "@components/router/router-state";
import {header} from "@pages/common/header";
import {footer} from "@pages/common/footer";
import {language_selector} from "@components/language-selector/language-selector";
import {set_language, get_language} from "@components/language-selector/language-selector-state";
import {green_button} from "@components/green-button/green-button";
import {ifState} from "@utils/xstate";
import {get_service} from "./menu-state";
import {Menu, Item} from "./menu-types";
import {pagination} from "@components/pagination/pagination";
import {repeat} from 'lit-html/directives/repeat';
import {random_selector} from "@components/random-selector/random-selector";
import "./menu.css";
import { stateValuesEqual } from "xstate/lib/State";

const onSelect = () => {
}

export const menu = () => {
    const {state, send} = get_service();

    send("RELOAD_LEVEL");

    return html`
        ${header()}
        ${ifState({
            loading,
            ready: () => ready({menu: state.context.menu, page: state.context.page}),
            error
        }) (state)
        }
        ${footer({right: html`
            ${language_selector()}
            ${random_selector()}
            `
        })}
    `
}

const loading = () => html`
    <div class="menu">
        <header>LOADING...</header>
    </div>
`;


const ready = ({menu, page}:{menu:Menu, page:number}) => {
    const section = menu.sections[page];
    const {send, state} = get_service();

    const onPage = (page:number) => {
        send({type: "PAGE", page});
    }

    const chooseText = get_language() === "english" ? "Choose:": "Khetha:"; 

    return html`
        <div class="menu">
            <header>${chooseText}</header>
            <div class="grid-row">
                ${
                    repeat(section, item => item.name, (item, idx) => make_item(item))
                }
            </div>
            ${pagination({total: menu.sections.length, current: state.context.page, onPage})}
        </div>
    `;
}

const make_item = (item:Item) => {
    const onSelect = () => {
        router_service.send({type: "GAME", game: item.name});
    }

    const label = get_language() === "english" ? item.label_en : item.label_zu;

    return html`
        <div>
            <div @click=${onSelect} class="cell">
                <img src=${CdnPath.root(`media/menu/${item.name}.png`)} />
            </div>
            ${label}
        </div>
    `;
}

const error = () => html`
    <div class="menu">
        <header>ERROR...</header>
    </div>
`;