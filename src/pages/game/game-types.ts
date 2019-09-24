export interface GameJson {
    items: Array<GameItem>
}

export interface GameItem {
    name: string;
    label_en: string;
    label_zu: string;
    disabled?: boolean
}

export interface Game {
    choices: Array<GameItem>;
    correct_index: number;
}