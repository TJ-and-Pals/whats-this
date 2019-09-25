import { interpret, Machine, assign } from "xstate";
import {kill_service as kill_game_service} from "@pages/game/game-state";
import {stop_global_oneshot} from "@utils/audio";

export const pathname = window.location.pathname.replace("/", "");
export const pages = pathname.indexOf("/") === -1 ? [pathname] : pathname.split("/");
export const pathRoot = pages[0];

const initial = 
    pathRoot === "menu" ? "menu"
    : pathRoot === "game" ? "game"
    : "home";

const routeMachine = Machine({
    id: "route",
    initial,
    context: {
        game: pathRoot === "game" ? pages[1] : "",
        level: pathRoot === "game" ? pages[2] : "rr",
    },
    states: {
        home: { 
            on: {
                MENU: {
                    target: "menu",
                    actions: assign({
                        level: (_, evt) => evt.level
                    })
                }
            }
        },
        menu: { 
            on: {
                HOME: "home",
                BACK: "home",
                GAME: {
                    target: "game",
                    actions: assign({
                        game: (_, evt) => evt.game,
                    })
                }
            }
        },
        game: { 
            on: {
                BACK: "menu",
                HOME: "home"
            },
            onExit: () => {
                stop_global_oneshot();
                kill_game_service();
            }
        }
    }
},
{
    actions: {
    }
});

export const router_service = interpret(routeMachine)
    .onTransition(state => {
        let pathName = state.matches("home") ? "/" : "/" + state.value.toString();
        if(state.matches("game")) {
            pathName += `/${state.context.game}/${state.context.level}`;
        }
        window.history.pushState(null, null, pathName); 
    })
  .start();

window.onpopstate = (evt) => {
    router_service.send("BACK");
}