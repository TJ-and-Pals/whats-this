import { interpret, Machine, assign } from "xstate";

export const pathname = window.location.pathname.replace("/", "");
export const pages = pathname.indexOf("/") === -1 ? [pathname] : pathname.split("/");
export const pathRoot = pages[0];

const initial = 
    pathname === "menu" ? "menu"
    : pathname === "game" ? "game"
    : "home";

const routeMachine = Machine({
    id: "route",
    initial,
    context: {
        game: ""
    },
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
                GAME: {
                    target: "game",
                    actions: assign({
                        game: (_, evt) => evt.game
                    })
                }
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
        let pathName = state.matches("home") ? "/" : state.value.toString();
        if(pathName === "game") {
            pathName += `/${state.context.game}`;
        }
        window.history.pushState(null, null, pathName); 
    })
  .start();

window.onpopstate = (evt) => {
    router_service.send("BACK");
}