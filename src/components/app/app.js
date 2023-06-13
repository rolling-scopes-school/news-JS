import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.renderNews = this.renderNews.bind(this);
    }

    start() {
        document
            .querySelector('.sources')
            .addEventListener('click', this.renderNews);
        this.renderSource();
    }

    async renderNews(e) {
      const news = await this.controller.getNews(e)
      this.view.drawNews(news);
    }

    async renderSource() {
      const source = await this.controller.getSources()
      this.view.drawSources(source);
    }
}

export default App;
