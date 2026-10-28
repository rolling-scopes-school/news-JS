import type { Source } from '../../../types';
import './sources.css';

class Sources {
    public draw(data: Pick<Source, 'id' | 'name'>[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp =
            document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        if (!sourceItemTemp) return;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(
                true,
            ) as DocumentFragment;

            const nameEl = sourceClone.querySelector('.source__item-name');
            const itemEl = sourceClone.querySelector('.source__item');
            if (!nameEl || !itemEl) {
                throw new Error('Source template is missing required elements');
            }
            nameEl.textContent = item.name;
            itemEl.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sources = document.querySelector('.sources');
        if (sources) sources.append(fragment);
    }
}

export default Sources;
