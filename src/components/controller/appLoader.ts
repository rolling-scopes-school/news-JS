import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        // .env plugin is not working
        super('https://newsapi.org/v2/' || '', {
            apiKey: 'd7de7bed8ff04ae2aebca24b8fc18937' || '',
        });
    }
}

export default AppLoader;
