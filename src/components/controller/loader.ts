// Описываем тип для опций (обычно это ключи API и т.д.)
export type RequestOptions = Record<string, string>;

// Описываем тип для колбэка (Function Type). 
// Это функция, которая принимает данные типа T и ничего не возвращает (void)
export type DataCallback<T> = (data: T) => void;

export interface GetRespParams {
    endpoint: string;
    options?: RequestOptions;
}

class Loader {
    private baseLink: string;
    private options: RequestOptions;

    constructor(baseLink: string, options: RequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }


    public getResp<T>(
        { endpoint, options = {} }: GetRespParams,
        callback: DataCallback<T> = (() => {
            console.error('No callback for GET response');
        }) as DataCallback<T>
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

    private makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: string,
        endpoint: string,
        callback: DataCallback<T>,
        options: RequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;