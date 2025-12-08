import './sources.css';
import { Source} from '../../../types/types';

class Sources {
    draw(data: Source[]):void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement | null;
        if(!sourceItemTemp){
            console.error('Template #sourceItemTemp is not found');
            return;
        }
        data.forEach((item: Source) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
            const sourceNameElement = sourceClone.querySelector('.source__item-name') as HTMLElement | null;
            const sourceItemElement = sourceClone.querySelector('.source__item') as HTMLElement | null;
            if(sourceNameElement) {
            sourceNameElement.textContent = item.name;
            }
            if(sourceItemElement) {
            sourceItemElement.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const sourcesElement = document.querySelector('.sources') as HTMLElement | null;
        if(!sourcesElement) {
            console.error('Element sourcesElement is not found');
            return;
        }
        sourcesElement.append(fragment);
    }
}

export default Sources;
