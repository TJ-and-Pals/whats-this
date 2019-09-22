import {Option} from 'fp-ts/lib/Option';
import {Either} from 'fp-ts/lib/Either';
import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import {Future, FutureInstance} from "fluture";

export interface Area {
    width: number;
    height: number;
}

export interface Point {
    x: number;
    y: number;
}

export interface Bounds {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
}

export const floatsEqual = (f1:number) => (f2:number) =>
    Math.abs(f1 - f2) < Number.EPSILON;

export const pointsEqual = (p1:Point) => (p2:Point):boolean => 
    floatsEqual(p1.x) (p2.x) && floatsEqual(p1.y) (p2.y);

export const vectorBetweenPoints = (p1:Point) => (p2:Point):Array<number> =>
    ([p1.x - p2.x, p1.y - p2.y]);


export const pointToVec2 = (p:Point) => ([p.x, p.y]);
export const pointToVec3 = (p:Point) => ([p.x, p.y, 0]);

export const vecToPoint = (v:Array<number>) => ({
    x: v[0],
    y: v[1]
});

export const findInOptionArray = <T>(pred: (x:T) => boolean) => (optionXs:Option<Array<T>>):Option<T> => 
    O.chain((xs:Array<T>) => {
        const x:T = xs.find(pred);
        return x == null ? O.none : O.some(x);
    }) (optionXs);

export const optionIs = <T>(option:Option<T>) => (value:T):boolean => 
    O.fold(() => false, (v:T) => v === value) (option);

export const arrayHas = <T>(arr:Array<T>) => (value:T):boolean => 
    arr.indexOf(value) !== -1;

export const tapFuture = <E,V>(future:FutureInstance<E,V>) => 
    future.map(x => (console.log(x), x));

export const findMap = <K,V>(pred: (key:K) => boolean) => (m:Map<K,V>):Option<V> => {
    for (var [k, v] of m) {
        if(pred(k)) {
            return O.some(v);
        }
    }

    return O.none;
}

export const findObject = <V>(pred: (key:string) => boolean) => (obj:{[key:string]: V}):Option<V> => {
    const key = Object.keys(obj).find(key => pred(key));

    return key ? O.some(obj[key]) : O.none;
}

export const appendStrings = (preds:Array<() => [string, boolean]>) => (initial:string) =>
  preds.reduce((acc, x) => {
    const [value, flag] = x();
    return flag ? `${acc} ${value}` : acc;
  }, initial)

/*
        if(Array.isArray(ks)) {
            if(ks.findIndex(k => state.matches(k)) !== -1) {
                return v;
            }
        } else if(state.matches(ks)) {
            return v;
        }
    }
}
*/