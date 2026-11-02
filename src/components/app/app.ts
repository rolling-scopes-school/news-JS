import AppController from '../controller/controller';
import AppView from '../view/appView';
import { NewsResponse, SourcesResponse } from '../../types';
class App {
    // Объявляем свойства и их типы
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        this.controller.getSources((data: SourcesResponse) => {
            this.view.drawSources(data);
        });

        // Ищем контейнер. Проверка if нужна из-за флага strict: true
        const sourcesContainer = document.querySelector('.sources');
        
        if (sourcesContainer) {
            sourcesContainer.addEventListener('click', (e: Event) => {
                this.controller.getNews(e, (data: NewsResponse) => {
                    this.view.drawNews(data);
                });
            });
        }
    }
}

export default App;