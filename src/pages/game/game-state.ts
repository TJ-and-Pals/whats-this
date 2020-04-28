import { interpret, Machine, spawn, assign } from "xstate";
import * as F from "fluture";
import {future_to_callback, invoke_future} from "@utils/xstate";
import {fetchJsonUrl} from "fluture-loaders";
import {CdnPath} from "@utils/path";
import {MAX_FEEDBACK} from "@config/config";
import {GameJson, Game, GameItem} from "./game-types"
import {router_service} from "@components/router/router-state";
import {random_index, random_suffix_2, shuffle_array_mut} from "@utils/rand";
import {play_global_oneshot, play_oneshot_future} from "@utils/audio";
import {set_language, get_language} from "@components/language-selector/language-selector-state";
import {get_random_selector} from "@components/random-selector/random-selector-state";

const machine = Machine({
    id: "game",
    initial: "waiting",
    context: {
        json: {},
        current_index: 0,
        game: {},
        isShowingCorrect: false
    },
    states: {
        waiting: {
            on: {
                LOAD: "loading"
            }
        },
        loading: { 
            invoke: {
                src: invoke_future(load_game_config) 
            },
            on: {
                RESOLVE: {
                    target: "init",
                    actions: assign({
                        current_index: () => 0,
                        json: (_, evt) => {
                            const items = evt.data.items;
                            if(get_random_selector()) {
                                shuffle_array_mut(items);
                            }
                            
                            return {
                                ...evt.data,
                                items: items.filter(item => !item.disabled)
                            }
                        }
                    }) as any
                },
                REJECT: {
                    target: "error",
                    actions: (ctx, evt) => {
                        console.log(evt);
                    }
                }
            }
        },

        init: {
            onEntry: assign({
                game: (ctx) => {
                    const {json}:{json:GameJson} = ctx;
                    const pool = json.items.slice(0);
                    const correct = pool.splice(ctx.current_index, 1)[0];
                    const wrong_1 = pool.splice(random_index(pool.length), 1)[0];
                    const wrong_2 = pool.splice(random_index(pool.length), 1)[0];
                    const choices = shuffle_array_mut([correct, wrong_1, wrong_2]);
                    const correct_index = choices.indexOf(correct);

                    return {
                        choices,
                        correct_index
                    }
                }
            }) as any,
            on: {
                "": "play"
            }
        },

        play: {
            onEntry: () => play_global_oneshot(get_random_intro()),
            on: {
                NEXT: "next",
                PREV: "prev",
                CORRECT: "waiting_correct",
                WRONG: {
                    actions: (ctx) => {
                        play_global_oneshot(get_random_bad_feedback());
                    }
                }
            }
        },

        waiting_correct: {
            onEntry: assign({
                isShowingCorrect: () => true 
            }),
            onExit: assign({
                isShowingCorrect: () => false
            }),
            invoke: {
                src: invoke_future((ctx) => {
                    const game_name = router_service.state.context.game;
                    const lang = get_language();
                    const item_name = ctx.game.choices[ctx.game.correct_index].name;
                    return play_oneshot_future(
                        CdnPath.root(`media/audio/${lang}/${game_name}/${item_name}.mp3`)
                    ).chain(() => play_oneshot_future(get_random_good_feedback()))
                }) 
            },
            on: {
                NEXT: "next",
                PREV: "prev",
                RESOLVE: {
                    target: "next",
                },
            }
        },

        next: {
            onEntry: assign({
                current_index: (ctx) => ctx.current_index + 1
            }),
            on: {
                "": [
                    {
                        target: "init", 
                        cond: (ctx) => ctx.current_index < (ctx.json as GameJson).items.length-1
                    },
                    {
                        target: "end"
                    }
                ]
            }
        },
        prev: {
            onEntry: assign({
                current_index: (ctx) => ctx.current_index > 0 ? ctx.current_index - 1 : 0
            }),
            on: {
                "": "init"
            }
        },
        end: {
            on: {
                PREV: "prev",
                BEGIN: "loading"
            }
        },
        error: {
        }
    }
});

function get_random_intro() {
    const lang = get_language();
    const suffix = random_suffix_2 (MAX_FEEDBACK.intro[lang]);
    return CdnPath.root(`media/audio/${lang}/common/question-variations-${suffix}.mp3`);
}

function get_random_bad_feedback() {
    const lang = get_language();
    const suffix = random_suffix_2 (MAX_FEEDBACK.bad[lang]);
    return CdnPath.root(`media/audio/${lang}/common/wrong-answer-variations-${suffix}.mp3`);
}

function get_random_good_feedback() {
    const lang = get_language();
    const suffix = random_suffix_2 (MAX_FEEDBACK.good[lang]);
    return CdnPath.root(`media/audio/${lang}/common/correct-answer-variations-${suffix}.mp3`);
}

function load_game_config() {
    const {game} = router_service.state.context;
    const {level} = router_service.state.context;

    return fetchJsonUrl (CdnPath.root(`config/sections/${game}-${level}.json`))
        /* Helps to debug "end of game" state
            a game must have at least be 3 items so that there are options
        .map(json => ({
            ...json,
            items: json.items.slice(0,3)
        }))
        */
}

let _service;

export const get_service = () => {
    if(!_service) {
        _service = interpret(machine).start();
    }

    return _service;
}

export const kill_service = () => {
    if(!_service) {
        _service.stop();
    }
    _service = undefined;
}