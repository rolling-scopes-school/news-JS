import './news.css';
import { Article } from '../../../types/news-api';

class News {
    draw(data: ReadonlyArray<Article>): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) {
                const itemEl = newsClone.querySelector('.news__item');
                if (itemEl) itemEl.classList.add('alt');
            }

            const photoEl = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            if (photoEl) {
                photoEl.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const authorEl = newsClone.querySelector('.news__meta-author');
            if (authorEl) authorEl.textContent = item.author ?? item.source.name;

            const dateEl = newsClone.querySelector('.news__meta-date');
            if (dateEl) {
                dateEl.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const titleEl = newsClone.querySelector('.news__description-title');
            if (titleEl) titleEl.textContent = item.title;

            const sourceEl = newsClone.querySelector('.news__description-source');
            if (sourceEl) sourceEl.textContent = item.source.name;

            const contentEl = newsClone.querySelector('.news__description-content');
            if (contentEl) contentEl.textContent = item.description ?? '';

            const readMoreEl = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
            if (readMoreEl) readMoreEl.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
