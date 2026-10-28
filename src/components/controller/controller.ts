import AppLoader from './appLoader';
import {
    Endpoints,
    type Callback,
    type NewsResponse,
    type SourceResponse,
} from '../../types';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourceResponse>): void {
        super.getResp<SourceResponse>(
            {
                endpoint: Endpoints.Sources,
            },
            callback,
        );
    }

    public getNews(e: Event, callback: Callback<NewsResponse>): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target?.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (!sourceId) return;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<NewsResponse>(
                        {
                            endpoint: Endpoints.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback,
                    );
                }
                return;
            }
            if (target.parentElement) target = target.parentElement;
        }
    }
}

export default AppController;
