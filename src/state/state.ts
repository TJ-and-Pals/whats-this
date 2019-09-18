export interface State {
    scale: number;
}

let _state:State = {
    scale: 1.0
};

export const get_state = () => _state;
export const set_state = (state:State) => _state = state;
export const update_state = (fn:(state:State) => State) => _state = fn(_state);