import News from './news/news';
import Sources from './sources/sources';
import type { News as NewsData, Source } from '../../types/types';

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsData) {
        const values = data?.articles ? data.articles : [];
        this.news.draw(values);
    }

    drawSources(data: { sources: Source[] }) {
        const values = data?.sources ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
