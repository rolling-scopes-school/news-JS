export enum Endpoint{
    Sources = 'sources',
    News = 'everything',
}

interface RequestConfig {
    endpoint: Endpoint;
    options?: Record<string, string>;
}

class Loader {
    private baseLink: string;
    private readonly options: Record<string, string>;

    constructor(baseLink: string, options: Record<string, string>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
         {endpoint,options = {}}: RequestConfig ,
        callback: (data: unknown) => void ) : void {
        this.load('GET', endpoint, callback, options);
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

    private load(
        method: string,
        endpoint: Endpoint,
        callback: (data: unknown) => void,
        options: Record<string, string> = {}
    ) : void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response) => this.errorHandler(res))
            .then((res: Response) => res.json())
            .then((data) => {
                callback(data);
            })
            .catch((err: unknown) => {
                console.error(err);
            });
    }
}

export default Loader;
