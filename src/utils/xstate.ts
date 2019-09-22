import {
    Machine,
    StateMachine,
    EventObject,
    OmniEvent,
    State,
    StateSchema,
    StateValue,
    actions
} from "xstate";
import {pipe} from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import {findMap,findObject} from "./generic";
import {TemplateResult} from "lit-html";

export const ifState = <TContext, TEvent extends EventObject>(lookup:{[key:string]: () => any} | Map<string | Array<string>, () => any>) => (state:State<TContext, TEvent>):any => {
    const maybeFn = lookup instanceof Map
        ?  findMap <string | Array<string>, () => TemplateResult>(ks => 
            Array.isArray(ks)
                ?  ks.findIndex(k => state.matches(k)) !== -1
                :  state.matches(ks)
            ) (lookup)
        : findObject<() => any> (k => state.matches(k)) (lookup);

    const invalidStateFn = () => {
        console.error(`NO VALID STATE!!! [${state.value.toString()}]`);
        return () => null;
    };

    let result = pipe(maybeFn, O.getOrElse(invalidStateFn));

    return result(); 
}