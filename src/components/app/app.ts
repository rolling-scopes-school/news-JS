import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private _controller: AppController;
    private _view: AppView;
    
    constructor() {
        this._controller = new AppController();
        this._view = new AppView();
    }

    start() {
        document
            .querySelector('.sources')
            .addEventListener('click', (e) => this._controller.getNews(e, (data) => this._view.drawNews(data)));
        this._controller.getSources((data) => this._view.drawSources(data));
    }
}

export default App;
