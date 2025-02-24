class Loader {
    protected baseLink: string;
    protected options: Record<string, string>;
    constructor(baseLink: string, options: Record<string, string> = {}) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options}: { endpoint: string; options?: Record<string, string>},
        callback: (data: NewsResponse) => void = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load(endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Record<string, string> = {}, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(endpoint: string, callback: (data: NewsResponse) => void, options: Record<string, string> = {}) {
        fetch(this.makeUrl(options, endpoint), { method: 'GET' })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: NewsResponse) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
import { NewsResponse } from '../../models/interfaces';
