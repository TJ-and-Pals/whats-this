import {home} from "@ui/pages/home";
import {menu} from "@ui/pages/menu";
import {Machine, interpret} from "xstate";
import {ifState} from "@utils/xstate";

const pathname = window.location.pathname.replace("/", "");
const initial = 
    pathname === "menu" ? "menu"
    : pathname === "game" ? "game"
    : "home";

const routeMachine = Machine({
    id: "route",
    initial,
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
},
{
    actions: {
    }
});

export const router_service = interpret(routeMachine)
    .onTransition(state => {
        const pathName = state.matches("home") ? "/" : state.value.toString();
        window.history.pushState(null, null, pathName); 
    })
  //.onTransition(state => console.log(state.value))
  .start();

window.onpopstate = (evt) => {
    router_service.send("BACK");
}