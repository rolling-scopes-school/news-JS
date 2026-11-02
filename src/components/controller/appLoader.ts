import Loader from './loader';

declare const process: {
    env: {
        API_KEY: string;
        API_URL: string;
    };
};

class AppLoader extends Loader {
    constructor() {
        super(process.env.API_URL, {
            apiKey: process.env.API_KEY,
        });
    }
}

export default AppLoader;
