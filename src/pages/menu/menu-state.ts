import { interpret, Machine, spawn, assign } from "xstate";
import * as F from "fluture";
import {future_to_callback, invoke_future} from "@utils/xstate";
import {fetchJsonUrl} from "fluture-loaders";
import {CdnPath} from "@utils/path";
import {router_service} from "@components/router/router-state";

const machine = Machine({
    id: "menu",
    initial: "loading",
    context: {
        menu: {},
        page: 0,
    },
    states: {
        loading: { 
            invoke: {
                src: invoke_future(() => {
                    const {level} = router_service.state.context;
                    return loadMenuConfig(level);
                }) 
            },
            on: {
                RESOLVE: {
                    target: "ready",
                    actions: assign({
                        menu: (_, evt) => evt.data
                    })
                },
                REJECT: {
                    target: "error",
                    actions: (ctx, evt) => {
                        console.log(evt);
                    }
                }
            }
        },
        ready: {
            on: {
                RELOAD: {
                    target: "loading",
                },
                PAGE: {
                    actions: assign({
                        page: (ctx, evt) => evt.page
                    })
                }
            }
        },
        error: {
        }
    }
});

function loadMenuConfig(level:string) {
    return fetchJsonUrl (CdnPath.root(`config/menu-${level}.json?cb=${Date.now()}`))
}

let _service;

export const get_service = () => {

    if(!_service) {
        _service = interpret(machine).start();
    }

    return _service;
}
