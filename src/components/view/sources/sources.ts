import './sources.css';
import { Source } from '../../../types/news-api';

type SourceItem = Pick<Source, 'id' | 'name'>;

class Sources {
    draw(data: ReadonlyArray<Source>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: SourceItem) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const nameEl = sourceClone.querySelector('.source__item-name');
            const itemEl = sourceClone.querySelector('.source__item');

            if (nameEl) nameEl.textContent = item.name;
            if (itemEl) itemEl.setAttribute('data-source-id', item.id ?? '');

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) sourcesContainer.append(fragment);
    }
}

export default Sources;
