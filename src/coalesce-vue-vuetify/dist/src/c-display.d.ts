import { CreateElement, VNode } from 'vue';
import MetadataComponent from './c-metadata-component';
export default class  extends MetadataComponent {
    element: string;
    dateFormat: string;
    render(h: CreateElement): VNode | null;
}
