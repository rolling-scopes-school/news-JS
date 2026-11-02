export type Source = {
    id: string;
    name: string;
};

export type News = {
    articles: {
        author: string | null;
        description: string | null;
        publishedAt: string;
        source: {
            id: string | null;
            name: string;
        };
        title: string;
        url: string;
        urlToImage: string | null;
    }[];
    status: string;
    totalResults: number;
};
