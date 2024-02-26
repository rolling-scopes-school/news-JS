import AppController from '../controller/controller';
import { Data, NewsData} from '../controller/loader';
import { AppView } from '../view/appView';

class App {
    private _controller: AppController;
    private _view: AppView;
    
    constructor() {
        this._controller = new AppController();
        this._view = new AppView();
    }

    start() {
        const source  = document.querySelector('.sources');

        if (!source) {
            throw new ReferenceError("Source element was not found.");
        }

        source.addEventListener('click', (e) => this._controller.getNews(e, (data: NewsData) => this._view.drawNews(data)));
        this._controller.getSources((data: Data) => this._view.drawSources(data));
    }
}

export default App;
