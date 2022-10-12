export interface TextItem {
    id: number;
    text: string;
    short_text: string;
    cover: string;
    category: string;
    title: string;
}

export interface TextItemResponse {
    item: TextItem;
    needAuth: boolean;
}

export interface TextItemsResponse {
    items: TextItem[];
    needAuth: boolean;
}