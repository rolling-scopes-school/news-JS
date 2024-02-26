import { SourceData } from '../../controller/loader';
import './sources.css';

class Sources {
    draw(data: SourceData[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        if (!sourceItemTemp) {
            throw new ReferenceError("No sourceItemTemp element found");
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const itemName = sourceClone.querySelector('.source__item-name') as HTMLDivElement;
            itemName.textContent = item.name;

            const itemSource = sourceClone.querySelector('.source__item') as HTMLDivElement;
            itemSource.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourceElement = document.querySelector('.sources');

        if (!sourceElement) {
            throw new ReferenceError("source element was not found");
        }
        sourceElement.append(fragment);
    }
}

export default Sources;
