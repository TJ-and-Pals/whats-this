export interface GameJson {
    items: Array<GameItem>
}

export interface GameItem {
    name: string;
    label_en: string;
    label_zu: string;
    disabled?: boolean;
    custom_question?: boolean;
    custom_answer?: boolean;
    size_en?: number;
    size_zu?: number;
    bigButton_zu?: boolean;
    bigButton_en?: boolean;
}

export interface Game {
    choices: Array<GameItem>;
    correct_index: number;
}