import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'YOUR_API_KEY',
        });
    }
}

export default AppLoader;
