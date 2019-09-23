export interface Menu {
    sections: Array<Section>
}

export type Section = Array<Item>

export interface Item {
    label: string;
    name: string;
}

