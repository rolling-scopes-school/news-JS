import './news.css';
import { Article } from '../../../types';

class News {
    public draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItem = newsClone.querySelector('.news__item');
            if (newsItem && idx % 2 !== 0) {
                newsItem.classList.add('alt');
            }

            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const metaAuthor = newsClone.querySelector('.news__meta-author');
            if (metaAuthor) {
                metaAuthor.textContent = item.author || item.source.name;
            }

            const metaDate = newsClone.querySelector('.news__meta-date');
            if (metaDate) {
                metaDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
            }

            const descTitle = newsClone.querySelector('.news__description-title');
            if (descTitle) descTitle.textContent = item.title;

            const descSource = newsClone.querySelector('.news__description-source');
            if (descSource) descSource.textContent = item.source.name;

            const descContent = newsClone.querySelector('.news__description-content');
            if (descContent) descContent.textContent = item.description || '';

            const readMoreLink = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
            if (readMoreLink) readMoreLink.setAttribute('href', item.url);

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