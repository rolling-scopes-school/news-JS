export type Options = {
    sources?: string;
    apiKey?: string;
}

export type Query = {
    endpoint: "everything" | "sources";
    options?: Options;
}

export interface SourceData {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

export interface Data {
    sources: SourceData[];
    status: string;
}

export interface NewsData {
    articles: Article[];
    status: string;
    totalResults: number;
}

export interface Article {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: Source;
    title: string;
    url: string;
    urlToImage: string; 
}

export interface Source {
    id: string;
    name: string;
}

export interface Loader {
    getResp(endpoint: Query, callback: (() => void) | undefined): void;
    errorHandler(response: Response): Response;
    makeUrl(query: Query): URL;
    load(method: RequestInit, endpoint: Query, callback: (data: NewsData | Data) => void): void;
}
