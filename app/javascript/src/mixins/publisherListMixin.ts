import { Publisher } from '@/type';
import { fetchRecords } from '@/services/CRUDServices';
import FadeTransition from '@/components/FadeTransition.vue';
import TableList from '@/components/TableList.vue';
import formMixin from '@/mixins/formMixin';

type AuthorState = {
  publishers: Array<Publisher>,
  isLoading: boolean
}

export default {
  mixins: [formMixin],
  components: { 
    'fade-transition': FadeTransition,
    'table-list': TableList 
  },
  data(): AuthorState {
    return {
      publishers: [],
      isLoading: false
    };
  },
  methods: {
    async getPublishers(): Promise<void> {
      try {
        this.isLoading = true;
        const result = await fetchRecords('publisher');
        this.publishers = result.data;
      } catch (error) {
        this.onHandleError(error);
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted(): void {
    this.getPublishers();
  }
};