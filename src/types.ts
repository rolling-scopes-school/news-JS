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
