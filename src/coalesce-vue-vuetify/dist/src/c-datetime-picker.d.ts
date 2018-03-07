import { Vue } from 'vue-property-decorator';
export default class  extends Vue {
    value?: Date | null;
    label?: string;
    dateFormat: string;
    readonly displayedValue: string;
    error: string[];
    textInputChanged(val: string): void;
    timeChanged(val: string): void;
    dateChanged(val: string): void;
    menu: boolean;
    selectedTab: "date" | "time" | null;
    readonly datePart: string | null;
    readonly timePart: string | null;
}
