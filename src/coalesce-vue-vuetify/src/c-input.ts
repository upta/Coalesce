
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import MetadataComponent from './c-metadata-component'
import CSelect from './c-select.vue'
import CDisplay from './c-display';
import CDatetimePicker from './c-datetime-picker.vue';

//@ts-ignore
import { VTextField } from 'vuetify/es5/components/VTextField';
import { ClassType, Property } from 'coalesce-vue/lib/metadata';
    
@Component({
  name: 'c-input',
  components: {
    CSelect, CDisplay, CDatetimePicker
  }
})
export default class extends MetadataComponent {
  collectionEdit = false;
  dateMenu = false;
}
