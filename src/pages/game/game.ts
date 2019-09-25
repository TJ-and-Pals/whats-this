import {html} from "lit-html";
import {CdnPath} from "@utils/path";
import {router_service} from "@components/router/router-state";
import {header} from "@pages/common/header";
import {footer, footer_left, footer_arrow_right, footer_arrow_left} from "@pages/common/footer";
import {language_selector} from "@components/language-selector/language-selector";
import {green_button} from "@components/green-button/green-button";
import {ifState} from "@utils/xstate";
import {get_service} from "./game-state";
import {pagination} from "@components/pagination/pagination";
import {repeat} from 'lit-html/directives/repeat';
import {Game, GameItem} from "./game-types";
import {get_language} from "@components/language-selector/language-selector-state";
import "./game.css";

export const game = () => {
    const {state, send} = get_service();
    const {context} = state;

    const on_left_arrow = 
        context.current_index > 0
            ? () => send("PREV")
            : null;
    
    const on_right_arrow = 
        context.json.items && context.current_index < context.json.items.length-1
            ? () => send("NEXT")
            : null;
   
    const stateMap = new Map();

    stateMap.set("waiting", () => null);
    stateMap.set("loading", loading);
    stateMap.set("error", error);
    stateMap.set("init", () => null);
    stateMap.set("end", () => null);
    stateMap.set(["play", "waiting_correct"], () => play(context.game));

    if(state.matches("waiting")) {
        send("LOAD");
    }
    return html`
        ${header()}
        ${ifState(stateMap) (state) }
        ${footer({
            right: html`
                ${language_selector()}
                ${footer_arrow_right(on_right_arrow)}
            `,
            left: footer_left({
                left_of_home: footer_arrow_left(on_left_arrow),
                home: true
            })
        })}
    `
}

const loading = () => html`
    <div class="game">
        <header>LOADING...</header>
    </div>
`;

const error = () => html`
    <div class="game">
        <header>ERROR...</header>
    </div>
`;


const play = (game:Game) => {
    const game_name = router_service.state.context.game;
    const correct = game.choices[game.correct_index]; 
    const wrong = game.choices.filter((_, idx) => idx !== game.correct_index);

    const {send} = get_service();

    const on_click = (index:number) => {
        if(index === game.correct_index) {
            send("CORRECT");
        } else {
            send("WRONG");
        }
    }

    const lang = get_language();

    return html`
        <div class="game">
            <div class="hint">
                <img src=${CdnPath.root(`media/image/${game_name}/${correct.name}.jpg`)} />
            </div>
            <div class="choices-container">
                <div class="choices">
                    ${game.choices.map((choice, index) => 
                        html`
                            <div class="choice">
                                <div class="green-button" @click=${() => on_click(index)}>
                                    ${lang === "english" ? choice.label_en : choice.label_zu}
                                </div>
                            </div>
                        `
                    )}
                </div>
            </div>
        </div>
    `;
}