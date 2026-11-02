import AppLoader from './appLoader';
// Импортируем наши интерфейсы (проверь правильность пути, если папка types лежит в src)
import { NewsResponse, SourcesResponse } from '../../types';

// Описываем типы для колбэков (Function Types)
type SourcesCallback = (data: SourcesResponse) => void;
type NewsCallback = (data: NewsResponse) => void;

class AppController extends AppLoader {
    // Добавляем public и типизируем колбэк
    public getSources(callback: SourcesCallback): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    // Типизируем событие (Event) и колбэк
    public getNews(e: Event, callback: NewsCallback): void {
        // Приводим типы к HTMLElement, так как у EventTarget нет свойств classList и getAttribute
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                
                // Проверка на null, так как strict: true требует этого
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
            
            if (target.parentElement) {
                target = target.parentElement;
            } else {
                break; 
            }
        }
    }
}

export default AppController;