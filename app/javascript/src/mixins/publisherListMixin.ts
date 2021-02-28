import { Publisher } from '@/type';
import { fetchRecords } from '@/services/CRUDServices';
import FadeTransition from '@/components/FadeTransition.vue';
import TableList from '@/components/TableList.vue';

type AuthorState = {
  publishers: Array<Publisher>,
  isLoading: boolean
}

export default {
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
    this.getPublishers();
  }
};