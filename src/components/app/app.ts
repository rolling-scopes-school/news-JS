import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsResponse } from '../../types/news-api';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesContainer = document.querySelector('.sources');

        sourcesContainer?.addEventListener('click', (e: Event) =>
            this.controller.getNews(e as MouseEvent, (data: NewsResponse) => this.view.drawNews(data))
        );

        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
