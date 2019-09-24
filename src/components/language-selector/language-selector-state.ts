
let _state:"english" | "zulu" = "english";

export const set_language = (state:"english" | "zulu") => _state = state;
export const get_language = () => _state;