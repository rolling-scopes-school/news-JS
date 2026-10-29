export interface Source {
    id: string | null;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface Article {
    source: Source;
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
    totalResults?: number;
}

export interface NewsResponse {
    status: string;
    articles: Article[];
    totalResults?: number;
}

export interface NewsApiOptions {
    apiKey: string;
    sources?: string;
    q?: string;
    category?: string;
    language?: string;
    country?: string;
    pageSize?: number;
    page?: number;
}
