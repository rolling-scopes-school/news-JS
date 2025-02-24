import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsResponse } from '../../models/interfaces';

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sources: HTMLDivElement | null = document.querySelector('.sources');
        if (sources) {
            sources.addEventListener('click', (e: MouseEvent): void =>
                this.controller.getNews(e, (data: NewsResponse): void => this.view.drawNews(data))
            );
            this.controller.getSources((data: NewsResponse) => this.view.drawSources(data));
        } else {
            console.log('Div with class sources is not found');
        }
    }
}

export default App;
