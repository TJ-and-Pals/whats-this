import {html, nothing} from "lit-html";
import {CdnPath} from "@utils/path";
import {router_service} from "@components/router/router-state";
import {header} from "@pages/common/header";
import {footer, footer_left, footer_arrow_left} from "@pages/common/footer";
import {language_selector} from "@components/language-selector/language-selector";
import {set_language, get_language} from "@components/language-selector/language-selector-state";
import {play_global_oneshot, play_oneshot_future, stop_global_oneshot} from "@utils/audio";
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

    const chooseText = get_language() === "english" ? "Choose:": "Khetha:"; 

    const lang = get_language();
    return html`
        ${header()}
        ${ifState({
            loading,
            ready: () => ready({menu: state.context.menu, page: state.context.page}),
            error
        }) (state)
        }
        ${footer({
            left: footer_left({
                home: true,
                home_is_first: true,
                has_random: lang === "zulu"
            }),
            right: html`
                ${language_selector()}
                ${lang !== "zulu" ? random_selector() : nothing}
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

    const onHover = () => {

        const lang = get_language();
        const path = CdnPath.root(`media/audio/${lang}/${item.name}.mp3`);
        play_global_oneshot(path);
    }

    const onHoverOut = () => {
        stop_global_oneshot();
    }

    const label = get_language() === "english" ? item.label_en : item.label_zu;

    return html`
        <div>
            <div @click=${onSelect} class="cell" @mouseover=${onHover} @mouseout=${onHoverOut}>
                <img src=${CdnPath.root(`media/menu/${item.name}.png`)} />
            </div>
            <div class="label">
                ${label}
            </div>
        </div>
    `;
}

const error = () => html`
    <div class="menu">
        <header>ERROR...</header>
    </div>
`;