import { SourceData } from '../../controller/loader';
import './sources.css';

class Sources {
    draw(data: SourceData[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        if (!sourceItemTemp) {
            throw new ReferenceError("No sourceItemTemp element found");
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);

            sourceClone.querySelector('.source__item-name').textContent = item.name;
            sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);

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
