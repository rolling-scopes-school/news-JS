// export interface NewsArticle {
//     title: string;
//     description: string | null;
//     url: string;
// }

export enum ResponseStatus {
    OK = 'ok',
    ERROR = 'error',
}

export interface NewsAPIResponse {
    status: ResponseStatus;
    totalResults: number;
    articles: Article[];
}

export interface NewsResponse {
    status: ResponseStatus;
    totalResults: number;
    articles: Article[];
}

export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface Source {
    id: string | null;
    name: string;
}

export interface SourcesResponse {
    status: string;
    sources: Source[];
}

export interface SourcesAPIResponse {
    status: string;
    sources: Source[];
}
