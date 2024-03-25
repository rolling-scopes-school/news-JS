export interface INews {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface ISource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface INewsData {
    status: 'ok' | 'error';
    totalResults: number;
    articles: INews[];
}

export interface INewsSources {
    status: 'ok' | 'error';
    sources: ISource[];
}
