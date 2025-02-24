import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (data: NewsResponse) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: (data: NewsResponse) => void): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLDivElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                } else {
                  console.error(`Error: data-source-id not found or null `, target);
                }
                return;
            }
            if(target.parentNode instanceof HTMLElement){
            target = target.parentNode;
            }
        }
    }
}

export default AppController;
import { NewsResponse } from '../../models/interfaces';
