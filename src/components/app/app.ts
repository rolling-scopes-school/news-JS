import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import type { News as NewsData, Source } from '../../types/types';

class App {
    public controller: AppController;
    public view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        document
            .querySelector<HTMLElement>('.sources')!
            .addEventListener('click', (event) =>
                this.controller.getNews(event, (data: NewsData) => this.view.drawNews(data))
            );
        this.controller.getSources((data: { sources: Source[] }) => this.view.drawSources(data));
    }
}

export default App;
