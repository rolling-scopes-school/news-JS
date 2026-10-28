import type { NewsResponse, SourceResponse } from '../../types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sources = document.querySelector('.sources');
        if (sources)
            sources.addEventListener('click', (e) => {
                this.controller.getNews(e, (data: NewsResponse) =>
                    this.view.drawNews(data),
                );
            });
        this.controller.getSources((data: SourceResponse) =>
            this.view.drawSources(data),
        );
    }
}

export default App;
