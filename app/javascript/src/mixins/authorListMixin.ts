import { Author } from '@/type';
import { fetchRecords } from '@/services/CRUDServices';
import FadeTransition from '@/components/FadeTransition.vue';
import TableList from '@/components/TableList.vue';
import formMixin from '@/mixins/formMixin';

type AuthorState = {
  authors: Array<Author>,
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
      authors: [],
      isLoading: false
    };
  },
  methods: {
    async getAuthors(): Promise<void> {
      try {
        this.isLoading = true;
        const result = await fetchRecords('author');
        this.authors = result.data;
      } catch (error) {
        this.onHandleError(error);
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted(): void {
    this.getAuthors();
  }
};