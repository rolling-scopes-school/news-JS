import { INewsResponce, ISourceRespons } from 'types/interfaces';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: any;
    private sources: any;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: INewsResponce): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ISourceRespons): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
