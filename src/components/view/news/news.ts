import { NewsItem } from 'utils/types';
import './news.css';

class News {
    draw(data: NewsItem[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            if (!(newsItemTemp.content.cloneNode(true) instanceof HTMLElement)) {
                throw new Error('Error in template');
            }
            const newsClone = newsItemTemp.content.cloneNode(true);

            if (idx % 2) (newsClone as HTMLElement).querySelector('.news__item')?.classList.add('alt');

            newsClone.querySelector('.news__meta-photo').style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            newsClone.querySelector('.news__meta-author').textContent = item.author || item.source.name;
            newsClone.querySelector('.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            newsClone.querySelector('.news__description-title').textContent = item.title;
            newsClone.querySelector('.news__description-source').textContent = item.source.name;
            newsClone.querySelector('.news__description-content').textContent = item.description;
            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        if (document.querySelector('.news')) {
            (document.querySelector('.news') as Element).innerHTML = '';
            (document.querySelector('.news') as Element).appendChild(fragment);
        }
    }
}

export default News;
