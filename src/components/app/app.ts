import AppController from '../controller/controller';
import { AppView, ArticlesData, SourcesData } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;
        constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const source = document.querySelector('.sources') as HTMLElement;
        source.addEventListener('click', (e) => this.controller.getNews<ArticlesData>(e, (data: ArticlesData) => this.view.drawNews(data)));
        this.controller.getSources((data: SourcesData) => this.view.drawSources(data));
    }
}

export default App;
