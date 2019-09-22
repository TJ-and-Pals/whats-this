import {home} from "@ui/pages/home";
import {menu} from "@ui/pages/menu";
import {Machine, interpret} from "xstate";
import {ifState} from "@utils/xstate";

const routeMachine = Machine({
    id: "route",
    initial: "home",
    states: {
        home: { 
            on: {
                MENU: "menu"
            }
        },
        menu: { 
            on: {
                HOME: "home",
                BACK: "home",
                GAME: "menu"
            }
        },
        game: { 
            on: {
                BACK: "menu",
                HOME: "home"
            }
        }
    }
});

export const router_service = interpret(routeMachine)
  //.onTransition(state => console.log(state.value))
  .start();
