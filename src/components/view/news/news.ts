import './news.css';
import type { NewsItem } from '../../../types';

class News {
    private setText(
        fragment: DocumentFragment,
        selector: string,
        value: string | null,
    ): void {
        const el = fragment.querySelector(selector);
        if (el) el.textContent = value;
    }

    private fillCard(
        clone: DocumentFragment,
        item: NewsItem,
        idx: number,
    ): void {
        if (idx % 2) {
            clone.querySelector('.news__item')?.classList.add('alt');
        }

        const metaPhoto = clone.querySelector<HTMLElement>('.news__meta-photo');
        if (metaPhoto) {
            const image = item.urlToImage || 'img/news_placeholder.jpg';
            metaPhoto.style.backgroundImage = `url(${image})`;
        }

        this.setText(
            clone,
            '.news__meta-author',
            item.author || item.source.name,
        );
        this.setText(
            clone,
            '.news__meta-date',
            item.publishedAt.slice(0, 10).split('-').reverse().join('-'),
        );
        this.setText(clone, '.news__description-title', item.title);
        this.setText(clone, '.news__description-source', item.source.name);
        this.setText(clone, '.news__description-content', item.description);

        const readMore = clone.querySelector('.news__read-more a');
        if (readMore) readMore.setAttribute('href', item.url);
    }

    public draw(data: NewsItem[]): void {
        const newsItemTemp =
            document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        if (!newsItemTemp) return;

        const fragment = document.createDocumentFragment();

        data.slice(0, 10).forEach((item, idx) => {
            const clone = newsItemTemp.content.cloneNode(
                true,
            ) as DocumentFragment;
            this.fillCard(clone, item, idx);
            fragment.append(clone);
        });

        const newsEl = document.querySelector('.news');
        if (newsEl) {
            newsEl.replaceChildren();
            newsEl.appendChild(fragment);
        }
    }
}

export default News;
