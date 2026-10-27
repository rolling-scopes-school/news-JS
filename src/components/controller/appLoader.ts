import Loader from './loader';
import { NewsApiOptions } from '../../types/news-api';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL ?? '';
        const apiKey = process.env.API_KEY ?? '';
        const options: NewsApiOptions = { apiKey };
        super(apiUrl, options);
    }
}

export default AppLoader;
