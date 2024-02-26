import App from '../app/app';
import AppLoader from './appLoader';
import { Options } from './loader';

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
        const options: Options =  {
            apiKey: apiKey
        }
        this._appLoader = new AppLoader(apiBaseUrl, options);
    }

    getSources(callback) {
        this._appLoader.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e, callback) {
        let target = e.target;
        const newsContainer = e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    this._appLoader.getResp(
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
            target = target.parentNode;
        }
    }
}

export default AppController;
