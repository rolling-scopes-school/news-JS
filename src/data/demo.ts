import type { Article, SourcesResponse } from '../types/news';

export const demoSources: SourcesResponse = {
    status: 'ok',
    sources: [
        {
            id: 'technology-demo',
            name: 'Technology Demo',
            description: 'Sample technology articles',
            url: 'https://www.typescriptlang.org',
            category: 'technology',
            language: 'en',
            country: 'us',
        },
        {
            id: 'science-demo',
            name: 'Science Demo',
            description: 'Sample science articles',
            url: 'https://www.nasa.gov',
            category: 'science',
            language: 'en',
            country: 'us',
        },
        {
            id: 'education-demo',
            name: 'Education Demo',
            description: 'Sample education articles',
            url: 'https://rs.school',
            category: 'general',
            language: 'en',
            country: 'us',
        },
    ],
};

function createArticle(id: string, sourceName: string, title: string, description: string, url: string): Article {
    return {
        source: { id, name: sourceName },
        author: 'NewsJS Demo',
        title,
        description,
        url,
        urlToImage: null,
        publishedAt: '2026-11-03T10:00:00Z',
        content: description,
    };
}

export const demoArticles: Readonly<Record<string, Article[]>> = {
    'technology-demo': [
        createArticle(
            'technology-demo',
            'Technology Demo',
            'Explore TypeScript',
            'Learn about TypeScript and static typing.',
            'https://www.typescriptlang.org/docs/'
        ),
        createArticle(
            'technology-demo',
            'Technology Demo',
            'JavaScript Development',
            'Explore modern JavaScript documentation.',
            'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
        ),
    ],
    'science-demo': [
        createArticle(
            'science-demo',
            'Science Demo',
            'Explore Space',
            'Discover educational resources about space.',
            'https://www.nasa.gov/'
        ),
    ],
    'education-demo': [
        createArticle(
            'education-demo',
            'Education Demo',
            'Rolling Scopes School',
            'Explore the JavaScript course.',
            'https://rs.school/courses/javascript'
        ),
    ],
};
