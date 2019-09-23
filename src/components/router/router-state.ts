import { interpret, Machine } from "xstate";

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
  .start();

window.onpopstate = (evt) => {
    router_service.send("BACK");
}