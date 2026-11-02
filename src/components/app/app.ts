import AppController from '../controller/controller';
import AppView from '../view/appView';
import { ArticlesResponse, SourcesResponse } from '../../types';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesElement = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: Event) => 
                this.controller.getNews(e, (data: ArticlesResponse) => this.view.drawNews(data))
            );
        }
        this.controller.getSources((data: SourcesResponse) => this.view.drawSources(data));
    }
}

export default App;