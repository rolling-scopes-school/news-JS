import AppLoader from './appLoader';
import { SourcesResponse, NewsResponse } from '../../types/news-api';

type SourcesCallback = (data: SourcesResponse) => void;
type NewsCallback = (data: NewsResponse) => void;

class AppController extends AppLoader {
    getSources(callback: SourcesCallback): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: NewsCallback): void {
        let target = e.target as Element | null;
        const newsContainer = e.currentTarget as Element;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<NewsResponse>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
