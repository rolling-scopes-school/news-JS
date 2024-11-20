import { INewsResponce, ISourceRespons } from '../../types/interfaces';
import AppLoader from './appLoader';
import { NewsCategory } from '../../types/enums';

class AppController extends AppLoader {
    getSources(callback: (data: ISourceRespons) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
                options: {
                    category: NewsCategory.Technology,
                },
            },
            callback
        );
    }

    getNews(e: Event, callback: (data: INewsResponce) => void): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId!);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId!,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
