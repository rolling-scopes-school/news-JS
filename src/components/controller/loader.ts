import { UrlParams, Callback, NewsApiResponse } from "../../types/types";

class Loader {
    private baseLink: string;
    private options: UrlParams;

    constructor(baseLink: string, options: UrlParams) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: {endpoint: string, options: UrlParams},

        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: UrlParams, endpoint:string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.entries(urlOptions).forEach(([key, value]) => {
            if (value !== undefined) {
            url += `${key}=${value}&`;
            }
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: Callback<NewsApiResponse>, options: UrlParams = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
