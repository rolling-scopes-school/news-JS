import {
    NewsAPIResponse,
    NewsResponse,
    SourcesResponse,
    SourcesAPIResponse,
    ResponseStatus,
} from '../../types/interfaces';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (data: SourcesResponse) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            (data: SourcesAPIResponse) => {
                console.log('Received data:', data);
                callback({
                    status: ResponseStatus.OK,
                    sources: data.sources.map((source) => ({
                        id: source.id || null,
                        name: source.name || 'Unknown',
                    })),
                });
            }
        );
    }

    getNews(e: Event, callback: (data: NewsAPIResponse) => void): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        (data) => {
                            if (callback) callback(data as NewsResponse);
                        }
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
