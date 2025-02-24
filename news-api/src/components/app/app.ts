import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsAPIResponse, SourcesResponse } from '../../types/interfaces';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesElement = document.querySelector('.sources') as HTMLElement;

        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: Event) => {
                const event = e as MouseEvent | TouchEvent;
                this.controller.getNews(event, (data: NewsAPIResponse) => this.view.drawNews(data));
            });
        }

        this.controller.getSources((data: SourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
