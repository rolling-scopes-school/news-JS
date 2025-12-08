import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL || 'https://newsapi.org/v2';
        const apiKey = process.env.API_KEY || '';

        if(!apiKey && process.env.NODE_ENV === 'development') {
            console.warn('API_KEY is not set in enviroment variables');

        }
        super(apiUrl, {
            apiKey: apiKey,
        });

    }
}

export default AppLoader;
