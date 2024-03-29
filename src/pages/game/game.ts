import {html} from "lit-html";
import {CdnPath} from "@utils/path";
import {router_service} from "@components/router/router-state";
import {header} from "@pages/common/header";
import {footer, footer_left, footer_arrow_right, footer_arrow_left} from "@pages/common/footer";
import {language_selector} from "@components/language-selector/language-selector";
import {ifState} from "@utils/xstate";
import {get_service} from "./game-state";
import {pagination} from "@components/pagination/pagination";
import {repeat} from 'lit-html/directives/repeat';
import {Game, GameItem} from "./game-types";
import {get_language} from "@components/language-selector/language-selector-state";
import "./game.css";
import { classMap } from "lit-html/directives/class-map";
import { styleMap } from "lit-html/directives/style-map";

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
    stateMap.set("end", () => {
        router_service.send("MENU");
    });
    stateMap.set(["play", "play_from_wrong", "waiting_correct", "waiting_wrong"], () => play(context.game, context.isShowingCorrect, context.wrongIndex));

    if(state.matches("waiting")) {
        send("LOAD");
    }
    return html`
        ${header()}
        ${ifState(stateMap) (state) }
        ${footer({
            left: footer_left({
                left_of_home: footer_arrow_left(on_left_arrow),
                home: true,
                menu: true
            }),
            right: html`
                ${language_selector()}
                ${footer_arrow_right(on_right_arrow)}
            `,
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


const play = (game:Game, isShowingCorrect: boolean, wrongIndex:number) => {
    const game_name = router_service.state.context.game;
    const correct = game.choices[game.correct_index]; 
    const wrong = game.choices.filter((_, idx) => idx !== game.correct_index);


    const isShowingWrong = wrongIndex != -1;

    const {send} = get_service();

    const on_click = (index:number) => {
        if(index === game.correct_index) {
            send("CORRECT");
        } else {
            send({type: "WRONG", index});
        }
    }

    const lang = get_language();

    const getText = (item:GameItem) => lang === "english" ? item.label_en : item.label_zu;
    const getTextStyle = (item:GameItem) => {
        const size = lang === "english" ? item.size_en : item.size_zu;
        return size ? styleMap({fontSize: `calc(${size}px * var(--scale))`}) : styleMap({});
    }
    const getButtonClass = ({item, isCorrect, isWrong}:{item:GameItem, isCorrect:boolean, isWrong:boolean}) => {
        return classMap({
            ["green-button"]: true, 
            ["green-button-game"]: true, 
            correct: isCorrect && isShowingCorrect,
            wrong: isWrong && isShowingWrong
        }); 
    }

    return html`
        <div class="game">
            <div class="hint">
                <img src=${CdnPath.root(`media/image/${game_name}/${correct.name}.jpg`)} />
            </div>
            <div class="answerText">${isShowingCorrect ? getText(correct) : ""}</div>
            <div class="choices-container">
                <div class="choices">
                    ${game.choices.map((choice, index) => {
                        const isCorrect = index === game.correct_index;
                        const isWrong = index === wrongIndex;

                        return html`
                            <div>
                                <div 
                                    class=${getButtonClass ({item: choice, isCorrect, isWrong})}
                                    @click=${() => on_click(index)}
                                    >
                                    <div style=${getTextStyle(choice)}>${getText(choice)}</div>

                                </div>
                            </div>
                        `
                    })}
                </div>
            </div>
        </div>
    `;
}