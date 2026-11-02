import './sources.css';
import { Source } from '../../../types';

class Sources {
    public draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        if (!sourceItemTemp) return; // Проверка на null

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            const itemName = sourceClone.querySelector('.source__item-name');
            if (itemName) itemName.textContent = item.name;

            const sourceItem = sourceClone.querySelector('.source__item') as HTMLElement;
            if (sourceItem) sourceItem.setAttribute('data-source-id', item.id || '');

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources') as HTMLElement;
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;