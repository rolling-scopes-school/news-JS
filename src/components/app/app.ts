import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { INewsData, INewsSources } from '../../types/INewsData';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        (document.querySelector('.sources') as HTMLDivElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data: INewsData) => {
                this.view.drawNews(data);
                console.log(data);
            })
        );
        this.controller.getSources((data: INewsSources) => this.view.drawSources(data));
    }
}

export default App;
