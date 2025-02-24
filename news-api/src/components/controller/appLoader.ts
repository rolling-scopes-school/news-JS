import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(process.env.API_URL ?? '', {
            apiKey: process.env.API_KEY ?? '',
        });

        console.log('Fetching from:', process.env.API_URL);
        console.log('Using API Key:', process.env.API_KEY);
    }
}

export default AppLoader;
