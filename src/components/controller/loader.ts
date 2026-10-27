import { NewsApiOptions } from '../../types/news-api';

enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
}

type JsonData<T> = T;
type FetchCallback<T> = (data: JsonData<T>) => void;

class Loader {
    private baseLink: string;
    private options: Readonly<NewsApiOptions>;

    constructor(baseLink: string, options: NewsApiOptions) {
        this.baseLink = baseLink;
        this.options = options as Readonly<NewsApiOptions>;
    }

    getResp<T>(
        { endpoint, options = {} }: { endpoint: string; options?: Partial<NewsApiOptions> },
        callback: FetchCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(HttpMethod.GET, endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw new Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Partial<NewsApiOptions>, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            const value = urlOptions[key as keyof NewsApiOptions];
            if (value !== undefined && value !== null) {
                url += `${key}=${value}&`;
            }
        });

        return url.slice(0, -1);
    }

    load<T>(
        method: HttpMethod,
        endpoint: string,
        callback: FetchCallback<T>,
        options: Partial<NewsApiOptions> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
