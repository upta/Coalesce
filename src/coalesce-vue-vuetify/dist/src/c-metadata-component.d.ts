import { Vue } from 'vue-property-decorator';
import { IHaveMetadata, Property } from 'coalesce-vue/lib/metadata';
export default abstract class  extends Vue {
    item?: IHaveMetadata;
    prop?: string | Property;
    readonly propMeta: Property;
}
