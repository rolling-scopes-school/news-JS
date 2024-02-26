import { Article, NewsData } from '../../controller/loader';
import './news.css';

class News {
    draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        if (!newsItemTemp) {
            throw new ReferenceError("No newsItemTemp element found");
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) {
                const newsItem = newsClone.querySelector('.news__item') as HTMLDivElement;
                newsItem.classList.add('alt');
            }

            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLDivElement;
            metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const metaAuthor = newsClone.querySelector('.news__meta-author') as HTMLDivElement;
            metaAuthor.textContent = item.author || item.source.name;

            const metaDate = newsClone.querySelector('.news__meta-date') as HTMLDivElement;
            metaDate.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            const descriptionTitle = newsClone.querySelector('.news__description-title') as HTMLDivElement;
            descriptionTitle.textContent = item.title;

            const descriptionSource = newsClone.querySelector('.news__description-source') as HTMLDivElement;
            descriptionSource.textContent = item.source.name;

            const descriptionContent = newsClone.querySelector('.news__description-content') as HTMLDivElement;
            descriptionContent.textContent = item.description;
            
            const readMore = newsClone.querySelector('.news__read-more a') as HTMLDivElement;
            readMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElement = document.querySelector('.news');

        if (!newsElement) {
            throw new ReferenceError("News element was not found");
        }
        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
