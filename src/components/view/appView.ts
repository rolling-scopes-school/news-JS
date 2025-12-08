import News from './news/news';
import Sources from './sources/sources';
import { NewsApiResponse, SourceApiResponse} from '../../types/types';

export class AppView {
    private news: News;
    private sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsApiResponse): void {
        const values = data.status === 'ok'? data.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourceApiResponse): void {
        const values = data.status === 'ok' ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
