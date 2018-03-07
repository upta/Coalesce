import MetadataComponent from './c-metadata-component';
export default class  extends MetadataComponent {
    loading: boolean;
    search: string | null;
    items: any[];
    readonly listItems: any[];
    private debouncedQuery;
    queryDropdownItems(): void;
    mounted(): void;
}
