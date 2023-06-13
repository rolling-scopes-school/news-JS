import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources() {
        return super.doRequest(
            {
                endpoint: 'sources',
            }
        );
    }

    getNews(e) {
        let target = e.target;
        const newsContainer = e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    return super.doRequest(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        }
                    );
                }
                return Promise.resolve({});
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
