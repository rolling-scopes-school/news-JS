import { Loader, Query, Options, Data, NewsData } from './loader';

class AppLoader implements Loader {
    private _baseLink: string;
    private _options: Options;

    constructor(baseLink: string, options: Options) {
        this._baseLink = baseLink;
        this._options = options;
    }

    getResp<T>(query: Query,
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load<T>({ method: 'Get' }, query, callback);
    }

    errorHandler(response: globalThis.Response): globalThis.Response {
        if (!response.ok) {
            if (response.status === 401 || response.status === 404)
                console.log(`Sorry, but there is ${response.status} error: ${response.statusText}`);
            throw Error(response.statusText);
        }

        return response;
    }

    makeUrl(query: Query): URL {
        const urlOptions: Options = { ...this._options, ...query.options };
        let url = `${this._baseLink}${query.endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return new URL(url.slice(0, -1));
    }

    load<T>(method: RequestInit, query: Query, callback: (data: T) => void): void {
        fetch(this.makeUrl(query), method)
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default AppLoader;
