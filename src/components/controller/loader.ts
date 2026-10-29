import { HTTPMethods, type Endpoints } from '../../types';
import type { Callback, RequestOptions } from '../../types';

class Loader {
    private baseLink: string;
    private readonly options: Readonly<Record<string, string>>;

    constructor(baseLink: string, options: Readonly<Record<string, string>>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp<T>(
        { endpoint, options = {} }: RequestOptions,
        callback: Callback<T> = () => {
            console.error('No callback for GET response');
        },
    ): void {
        this.load<T>(HTTPMethods.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(
                    `Sorry, but there is ${res.status} error: ${res.statusText}`,
                );
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(
        options: Record<string, string>,
        endpoint: Endpoints,
    ): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: HTTPMethods,
        endpoint: Endpoints,
        callback: Callback<T>,
        options: Record<string, string> = {},
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
