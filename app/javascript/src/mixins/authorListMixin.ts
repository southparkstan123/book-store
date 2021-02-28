import { Author } from '@/type';
import { fetchRecords } from '@/services/CRUDServices';
import FadeTransition from '@/components/FadeTransition.vue';
import TableList from '@/components/TableList.vue';

type AuthorState = {
  authors: Array<Author>,
  isLoading: boolean
}

export default {
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
    },
    onHandleError(error: any): void {
      const { status }  = error.response;
      const { message } = error.response.data;
  
      this.openModal({
        type: 'alert',
        message,
        title: `${status} Error`,
      });
    }
  },
  mounted(): void {
    this.getAuthors();
  }
};