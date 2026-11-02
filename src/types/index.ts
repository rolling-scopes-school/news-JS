export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface Article {
    source: Pick<Source, 'id' | 'name'>;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: string;
    sources: Source[];
}

export interface ArticlesResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum HttpStatus {
    Unauthorized = 401,
    NotFound = 404,
}

export type Callback<T> = (data: T) => void;

export interface ApiOptions {
    apiKey: string;
    sources: string;
}

export type RequestOptions = Partial<ApiOptions>;
