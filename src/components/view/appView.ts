import News from './news/news';
import Sources from './sources/sources';
import { NewsResponse, SourcesResponse, Article } from '../../types/news-api';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsResponse): void {
        const values: ReadonlyArray<Article> = data?.articles ? data.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourcesResponse): void {
        const values: ReadonlyArray<SourcesResponse['sources'][number]> = data?.sources ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
