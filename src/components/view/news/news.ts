import './news.css';
import type { Article, NewsPreview } from '../../../types/news';

class News {
    private drawPreview(newsClone: DocumentFragment, preview: NewsPreview): void {
        const title = newsClone.querySelector<HTMLElement>('.news__description-title');
        if (title) {
            title.textContent = preview.title;
        }

        const description = newsClone.querySelector<HTMLElement>('.news__description-content');
        if (description) {
            description.textContent = preview.description;
        }

        const link = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');
        if (link) {
            link.href = preview.url;
        }
    }

    public draw(data: Article[]): void {
        const news = data.slice(0, 10);

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            return;
        }

        news.forEach((item: Article, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItem = newsClone.querySelector<HTMLElement>('.news__item');
            if (idx % 2 && newsItem) {
                newsItem.classList.add('alt');
            }

            const photo = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (photo) {
                photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const author = newsClone.querySelector<HTMLElement>('.news__meta-author');
            if (author) {
                author.textContent = item.author || item.source.name;
            }

            const date = newsClone.querySelector<HTMLElement>('.news__meta-date');
            if (date) {
                date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            this.drawPreview(newsClone, item);

            const source = newsClone.querySelector<HTMLElement>('.news__description-source');
            if (source) {
                source.textContent = item.source.name;
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector<HTMLElement>('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
