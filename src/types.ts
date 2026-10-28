export interface Source {
    id: string;
    name: string;
}

export interface NewsItem {
    urlToImage: string;
    author: string;
    publishedAt: string;
    source: Source;
    title: string;
    description: string;
    url: string;
}

export interface SourceResponse {
    sources: Source[];
    status: string;
}

export interface NewsResponse {
    articles: NewsItem[];
    status: string;
    totalResults: number;
}

export type RequestOptions = {
    endpoint: Endpoints;
    options?: Record<string, string>;
};

export type Callback<T> = (data: T) => void;

export enum Endpoints {
    Sources = 'sources',
    Everything = 'everything',
}

export enum HTTPMethods {
    GET = 'GET',
}
