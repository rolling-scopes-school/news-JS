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
source: {
    id: string | null;
    name: string;
};
author: string | null;
title: string;
description: string | null;
url: string;
urlToImage:string | null;
publishedAt: string;
content: string | null;
}

export interface NewsApiResponse{
status: 'ok' | 'error';
totalResults?: number;
articles: Article[];
code?: string;
message?: string;
}

export interface SourceApiResponse{
status: 'ok' | 'error';
sources: Source[];
code?: string;
message?: string;
}

export type UrlParams = {
    apiKey?: string,
    category?: string,
    language?: string,
    country?: string,
    q?: string,
    source?: string,
    pageSize?: string,
    page?: string,
    sortby?: string,
    [key: string]: string | undefined

}

export interface Controller {
getNews(e?: Event): void;
getSources(e?: Event): void;
}

export type Callback<T> = (data: T) => void;

export enum endpoint {
Everything = 'everything',
TopHeadLines = 'top-headlines',
Sources = 'sources'
}