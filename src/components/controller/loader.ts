import { REQUEST_TYPE } from '../../utils/enums';
import { SourceItem } from '../../utils/types';

class Loader {
    baseLink: string | undefined;
    options: { apiKey: string | undefined } = { apiKey: undefined };

    constructor(baseLink: string | undefined, options: { apiKey: string | undefined }) {
        if (typeof baseLink !== 'undefined') {
            this.baseLink = baseLink;
        }
        if (typeof options !== 'undefined') {
            this.options = options;
        }
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: { sources?: string } },
        callback: (data: SourceItem[]) => void | undefined = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load(REQUEST_TYPE.GET, endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: { sources?: string }, endpoint: string) {
        const urlOptions: { sources?: string | undefined; apiKey: string | undefined } = {
            ...this.options,
            ...options,
        };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(
        method: REQUEST_TYPE.GET | REQUEST_TYPE.POST | REQUEST_TYPE.PUT | REQUEST_TYPE.PATCH | REQUEST_TYPE.DELETE,
        endpoint: string,
        callback: (data: SourceItem[]) => void | (() => void),
        options: { sources?: string } = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
