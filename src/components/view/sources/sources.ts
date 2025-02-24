import { Isource } from '../appView';
import './sources.css';


class Sources {
    draw(data: Isource[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
            if (sourceClone) {
                const name = sourceClone.querySelector('.source__item-name') as HTMLElement;
                const id = sourceClone.querySelector('.source__item') as HTMLElement;
            name.textContent = item.name;
            id.setAttribute('data-source-id', item.id);
            }
            fragment.append(sourceClone);
        });
        const sourcesWrap = document.querySelector('.sources') as HTMLElement;
        sourcesWrap.append(fragment);
    }
}

export default Sources;
