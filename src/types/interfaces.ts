export interface ISource {
    id: string | null;
    name: string;
}

export interface IArticle {
    source: ISource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface INewsResponce {
    status: string;
    totalResults: number;
    articles: IArticle[];
}

export interface ISourceRespons {
    status: string;
    sources:ISource[]
}
