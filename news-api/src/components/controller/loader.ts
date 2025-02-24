import { NewsResponse, SourcesAPIResponse } from '../../types/interfaces';

class Loader {
    private baseLink: string;
    private options: Record<string, string>

    constructor(baseLink: string, options: Record<string, string>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T extends NewsResponse | SourcesAPIResponse>(
        { endpoint, options = {} }: { endpoint: string; options?: Record<string, string> },
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, (data) => callback(data as T), options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(endpoint: string, options?: Record<string, string>) { // поменял местами параметры, так как если enpoint стоит в конце то TS выдает ошибку.
        const urlOptions = { ...this.options, ...(options || {}) }; // options не будет undefined
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        console.log('Fetching URL:', url);
        return url.slice(0, -1);
    }

    load(
        method: string,
        endpoint: string,
        callback: (data: NewsResponse) => void,
        options?: Record<string, string>
    ): void {
        fetch(this.makeUrl(endpoint, options), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
