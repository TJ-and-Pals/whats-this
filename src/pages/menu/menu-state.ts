import { interpret, Machine, spawn, assign } from "xstate";
import * as F from "fluture";
import {future_to_callback, invoke_future} from "@utils/xstate";
import {fetchJsonUrl} from "fluture-loaders";
import {CdnPath} from "@utils/path";

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
                src: invoke_future(loadMenuConfig) 
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

function loadMenuConfig() {
    return fetchJsonUrl (CdnPath.root("config/menu.json"))
}

let _service;

export const get_service = () => {
    if(!_service) {
        _service = interpret(machine).start();
    }

    return _service;
}
