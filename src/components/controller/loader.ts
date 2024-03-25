import { INewsData, INewsSources } from '../../types/INewsData';

type baseLinkType = string;
type optionsType = {
    apiKey: string;
};
interface endpointInterface {
    endpoint: string;
    options?: Record<string, string>;
}

class Loader {
    baseLink: baseLinkType;
    options: optionsType;
    constructor(baseLink: baseLinkType, options: optionsType) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<NewsData>(
        { endpoint, options = {} }: endpointInterface,
        callback: (data: NewsData) => void = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load<NewsData>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Record<string, string>, endpoint: string) {
        const urlOptions = { ...this.options, ...options } as Record<string, string>;
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key] as string}&`;
        });

        return url.slice(0, -1);
    }

    private load<NewsData>(
        method: 'GET' | 'POST',
        endpoint: string,
        callback: (data: NewsData) => void,
        options: Record<string, string> = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
