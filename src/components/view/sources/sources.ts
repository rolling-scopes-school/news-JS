import './sources.css';
import type { Source } from '../../../types/types';

class Sources {
    draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp!.content.cloneNode(true) as DocumentFragment;

            sourceClone.querySelector<Element>('.source__item-name')!.textContent = item.name;
            sourceClone.querySelector<Element>('.source__item')!.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')!.append(fragment);
    }
}

export default Sources;
