export interface Menu {
    sections: Array<Section>
}

export type Section = Array<Item>

export interface Item {
    label_en: string;
    label_zu: string;
    name: string;
}

