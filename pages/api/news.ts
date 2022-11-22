export interface NewsItem {
    id: number;
    text: string;
    cover_uri: string;
    category: string;
    title: string;
    abstract: string;
}

export interface NewsItemResponse {
    item: NewsItem,
    needAuth: boolean;
}

export interface NewsItemsResponse {
    items: NewsItem[],
    needAuth: boolean;
}

export enum NewsTag {
    INTERSLAVIC_CIRCLE= "interslavic-circle",
    SCIENCE= "science",
    SOCIETY= "society",
    KOLOZOR= "kolozor",
}
