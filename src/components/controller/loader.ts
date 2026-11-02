type QueryOptions = Readonly<Record<string, string | undefined>>;

interface RequestConfig {
    endpoint: string;
    options?: Partial<QueryOptions>;
}

type ResponseCallback<T> = (data: T) => void;

class Loader {
    private baseLink: string;
    private options: QueryOptions;

    constructor(baseLink: string, options: QueryOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: RequestConfig,
        callback: ResponseCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }

            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: QueryOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        const url = new URL(endpoint, `${this.baseLink.replace(/\/+$/, '')}/`);

        Object.entries(urlOptions).forEach(([key, value]) => {
            if (value !== undefined) {
                url.searchParams.set(key, value);
            }
        });

        return url.toString();
    }

    private load<T>(method: string, endpoint: string, callback: ResponseCallback<T>, options: QueryOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response) => this.errorHandler(res))
            .then((res: Response) => res.json() as Promise<T>)
            .then((data: T) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
