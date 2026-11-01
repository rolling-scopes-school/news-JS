import Loader from './loader';

class AppLoader extends Loader {
    public constructor() {
        const apiUrl = process.env.API_URL;
        const apiKey = process.env.API_KEY;
        if (!apiUrl) {
            throw new Error('Missing api url');
        }
        if(!apiKey) {
            throw new Error('Missing api key');
        }
        super(apiUrl, {
            apiKey: apiKey,
        });
    }
}

export default AppLoader;
