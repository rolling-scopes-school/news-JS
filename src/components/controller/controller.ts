import AppLoader from './appLoader';
import { Data, NewsData, Options, Query } from './loader';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            API_KEY: string;
            API_URL: string;
        }
    }
}

class AppController {
    private _appLoader: AppLoader;

    constructor() {
        const apiBaseUrl = process.env.API_URL;
        const apiKey = process.env.API_KEY;
        const options: Options = {
            apiKey: apiKey
        }
        this._appLoader = new AppLoader(apiBaseUrl, options);
    }

    getSources(callback: ((data: Data) => void)) : void {
        const query: Query = {
            endpoint: 'sources',
        }
        this._appLoader.getResp<Data>(query, callback);
    }

    getNews(e: Event, callback: ((data: NewsData) => void)) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (!sourceId) {
                    throw new ReferenceError("No data-source-id attribute found");
                }
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    const query: Query = {
                        endpoint: 'everything',
                        options: {
                            sources: sourceId,
                        },
                    };
                    this._appLoader.getResp<NewsData>(query, callback);
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
