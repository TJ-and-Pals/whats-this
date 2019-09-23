interface State {
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
}

let _state:State;

export const set_stage_state = (state:State) => _state = state;
export const get_stage_state = () => _state; 
