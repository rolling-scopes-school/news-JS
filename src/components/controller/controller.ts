import AppLoader from './appLoader';
import type { NewsResponse, SourcesResponse } from '../../types/news';
import { demoSources, demoArticles } from '../../data/demo';

enum ApiEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}

class AppController extends AppLoader {
    public getSources(callback: (data: SourcesResponse) => void): void {
        if (process.env.DEMO_MODE === 'true') {
            callback(demoSources);
            return;
        }

        super.getResp<SourcesResponse>(
            {
                endpoint: ApiEndpoint.Sources,
            },
            callback
        );
    }

    public getNews(event: MouseEvent, callback: (data: NewsResponse) => void): void {
        const target = event.target;
        const newsContainer = event.currentTarget;

        if (!(target instanceof Element) || !(newsContainer instanceof Element)) {
            return;
        }

        const sourceItem = target.closest('.source__item');

        if (!sourceItem || !newsContainer.contains(sourceItem)) {
            return;
        }

        const sourceId = sourceItem.getAttribute('data-source-id');

        if (!sourceId || newsContainer.getAttribute('data-source') === sourceId) {
            return;
        }

        if (process.env.DEMO_MODE === 'true') {
            const articles = demoArticles[sourceId] ?? [];

            callback({
                status: 'ok',
                totalResults: articles.length,
                articles,
            });

            newsContainer.setAttribute('data-source', sourceId);
            return;
        }

        super.getResp<NewsResponse>(
            {
                endpoint: ApiEndpoint.Everything,
                options: {
                    sources: sourceId,
                },
            },
            (data) => {
                callback(data);
                newsContainer.setAttribute('data-source', sourceId);
            }
        );
    }
}

export default AppController;
