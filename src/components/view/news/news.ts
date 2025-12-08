import './news.css';
import { Article } from '@/types/types';

class News {
    draw(data: Article[]): void {

        const news = data.length >= 10 ? data.filter((_item: Article | string, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement | null;
        if(!newsItemTemp) {
            console.error ('newsItemTemp is not found');
            return
        }

        news.forEach((item: Article, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            const newsItem = newsClone.querySelector('.news__item') as HTMLElement | null;
            if(!newsItem) {
                console.warn('Element newsItem is not found');
                return;
            }

            if (idx % 2) {
                newsItem.classList.add('alt');
            }

            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement | null;
            if(!metaPhoto) {
                console.warn('Element metaPhoto is not found');
                return;
            }

            metaPhoto.style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            const metaAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement | null;
            if(!metaAuthor) {
                console.warn('Element metaAuthor is not found');
                return;
            }
            metaAuthor.textContent = item.author || item.source.name;
            const metaDate = newsClone.querySelector('.news__meta-date') as HTMLElement | null;
            if(!metaDate){
                console.warn('Element metaDate is not found');
                return;
            }
            metaDate.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            const metaDescriptionTitle = newsClone.querySelector('.news__description-title') as HTMLElement | null;
            if(!metaDescriptionTitle) {
                console.warn('Element metaDescriptionTitle is not found');
                return;
            }
            metaDescriptionTitle.textContent = item.title;

            const metaDescriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement | null;
            if(!metaDescriptionSource) {
                console.warn('Element metaDescriptionSource is not found');
                return;
            }

            metaDescriptionSource.textContent = item.source.name;

            const metaDescriptionContent = newsClone.querySelector('.news__description-content') as HTMLElement | null;
            if(!metaDescriptionContent) {
                console.warn('Element metaDescriptionContent is not found');
                return;
            }
            metaDescriptionContent.textContent = item.description;

            const newsReadMoreLink = newsClone.querySelector('.news__read-more a') as HTMLElement | null;
            if(!newsReadMoreLink) {
                console.warn('Element newsReadMoreLink is not found');
                return;
            }
            newsReadMoreLink.setAttribute('href', item.url);

            fragment.append(newsClone);
        });
        const newsContainer = document.querySelector('.news') as HTMLElement | null;
        if(newsContainer) {
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    } else {
        console.error('Element .news is not found');
    }
}
}
export default News;
