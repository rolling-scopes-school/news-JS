export type SourceItem = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

export type GetNews = {
    status: 'ok';
    totalResults: number;
    articles: NewsItem[];
};

export type NewsItem = {
    source: {
        id: null;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};
