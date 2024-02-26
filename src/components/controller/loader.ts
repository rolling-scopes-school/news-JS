export type Options = {
    sources?: string;
    apiKey?: string;
}

export type Query  = {
    endpoint: "everything" | "sources";
    options?: Options;
}

export interface Loader {
    getResp(endpoint: Query, callback): void;
    errorHandler(response: Response): Response;
    makeUrl(query: Query): URL;
    load(method: RequestInit, endpoint: Query, callback, options: Options): void;
}
