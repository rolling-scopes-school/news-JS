import SourcesResponse  from '../models/sourcesResponse';
import NewsResponse from '../models/newsResponse';
export enum Endpoint{
    Sources = 'sources',
    News = 'everything',
}

interface ResponseMap{
    [Endpoint.News]: NewsResponse;
    [Endpoint.Sources]: SourcesResponse;
}

interface RequestConfig<E extends Endpoint> {
    endpoint: E;
    options?: Record<string, string>;
}

class Loader {
    private baseLink: string;
    private readonly options: Record<string, string>;

    constructor(baseLink: string, options: Record<string, string>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<E extends Endpoint>(
        config: RequestConfig<E>,
        callback: (data: ResponseMap[E]) => void
    ): void {
        this.load('GET', config, callback);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${String(res.status)} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Record<string, string>, endpoint: Endpoint): string {
        const urlOptions: Record<string, string> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<E extends Endpoint>(
        method: string,
        { endpoint, options = {} }: RequestConfig<E>,
        callback: (data: ResponseMap[E]) => void,
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response) => this.errorHandler(res))
            .then((res: Response) => res.json() as
                Promise<ResponseMap[E]>)

            .then((data) => {
                callback(data);
            })
            .catch((err: unknown) => {
                console.error(err);
            });
    }
}

export default Loader;
