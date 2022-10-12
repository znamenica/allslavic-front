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
