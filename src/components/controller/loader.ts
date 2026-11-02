import { Callback, Endpoint, HttpStatus, RequestOptions } from '../../types';

interface GetRespParams {
    endpoint: Endpoint;
    options?: RequestOptions;
}

class Loader {
    constructor(
        private readonly baseLink: string,
        private readonly options: Readonly<RequestOptions>
    ) {}

    protected getResp<T>(
        { endpoint, options = {} }: GetRespParams,
        callback: Callback<T> = (): void => console.error('No callback for GET response')
    ): void {
        // Проверяем, запущены ли мы на GitHub Pages
        const isGitHubPages = window.location.hostname.includes('github.io');
        
        if (isGitHubPages) {
            // Загружаем мок-данные
            this.loadMock(endpoint, callback);
        } else {
            // Загружаем реальные данные с API
            this.load<T>('GET', endpoint, callback, options);
        }
    }

    // Метод для загрузки мок-данных
    private loadMock<T>(endpoint: Endpoint, callback: Callback<T>): void {
        const mockFile = endpoint === Endpoint.Sources ? 'sources.json' : 'articles.json';
        const mockPath = `./mocks/${mockFile}`;

        fetch(mockPath)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to load mock: ${res.statusText}`);
                }
                return res;
            })
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err: Error) => console.error('Mock error:', err));
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === HttpStatus.Unauthorized || res.status === HttpStatus.NotFound) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }
        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: Endpoint): string {
        const urlOptions: Record<string, string | undefined> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            const value = urlOptions[key];
            if (value !== undefined) {
                url += `${key}=${value}&`;
            }
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: string,
        endpoint: Endpoint,
        callback: Callback<T>,
        options: RequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res) => this.errorHandler(res))
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;