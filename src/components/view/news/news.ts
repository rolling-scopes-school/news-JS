import { Iarticles } from '../appView';
import './news.css';


class News {
    draw(data: Iarticles[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp?.content.cloneNode(true) as HTMLElement;

            if (idx % 2) newsClone?.querySelector('.news__item')?.classList.add('alt');
            if (newsClone !== null) {
                const newsCloneItem = newsClone.querySelector('.news__meta-photo') as HTMLElement;
                if(newsCloneItem) {
                    newsCloneItem.style.backgroundImage = `url(${
                        item.urlToImage || 'img/news_placeholder.jpg'
                    })`;
                }
            }
            const author = newsClone.querySelector('.news__meta-author') as HTMLElement;
            const date = newsClone.querySelector('.news__meta-date') as HTMLElement;
            const title = newsClone.querySelector('.news__description-title') as HTMLElement;
            const source = newsClone.querySelector('.news__description-source') as HTMLElement;
            const content = newsClone.querySelector('.news__description-content') as HTMLElement;
            const readMore = newsClone.querySelector('.news__read-more a') as HTMLElement;
            

            author.textContent = item.author || item.source.name;
            date.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            title.textContent = item.title;
            source.textContent = item.source.name;
            content.textContent = item.description;
            readMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });
        const newsWrap = document.querySelector('.news') as HTMLElement;

        newsWrap.innerHTML = '';
        newsWrap.appendChild(fragment);
    }
}

export default News;
