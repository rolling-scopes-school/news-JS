import AppLoader from './appLoader';
import type { NewsResponse, SourcesResponse } from '../../types/news';

class AppController extends AppLoader {
    public getSources(callback: (data: SourcesResponse) => void): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
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

        super.getResp<NewsResponse>(
            {
                endpoint: 'everything',
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
