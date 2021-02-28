import { fetchRecordById } from '@/services/CRUDServices';
import { mapActions } from 'vuex';
import { BookForm } from '@/type';

type BookFormState = {
  form: BookForm,
  isLoading: boolean,
  mode: 'add' | 'edit',
  errors: Array<string>
}

export default {
  data(): BookFormState {
    return {
      form: {
        name: '',
        abstract: '',
        price: null,
        publisher_id: null,
        author_ids: []
      },
      isLoading: false,
      mode: 'add',
      errors: []
    };
  },
  methods: {
    ...mapActions({
      openModal: 'modal/openModal',
      createBook: 'book/create',
      updateBook: 'book/update'
    }),
    async onFetchBookRecord(id: number): Promise<void> {
      try {
        this.isLoading = true;
        const result = await fetchRecordById(id, 'book');
        const { name, abstract, price, publisher, authors }  = result.data;

        this.form.name = name;
        this.form.abstract = abstract;
        this.form.price = price;
        this.form.publisher_id = publisher.id;
        this.form.author_ids = authors.map((author: any) => author.id);
      } catch (error) {
        this.onHandleError(error);
      } finally {
        this.isLoading = false;
      }
    },
    async onUpdateBookRecord(): Promise<void> {
      try {
        if (this.mode === 'edit') {
          await this.updateBook({
            id: this.$route.params.id, 
            form: this.form
          });
        } else {
          await this.createBook({
            form: this.form
          });
        }
        
        this.$router.push('/books');
      } catch (error) {
        onHandleError(error);
      }
    },
    async onDeleteBook(): Promise<void> {
      try {
        await this.openModal({
          type: 'confirm',
          title: 'Delete',
          message: 'Are you sure?',
          action: 'book/delete',
          payload: { id: this.$route.params.id }
        });
      } catch (error) {
        this.onHandleError(error);
      }
    },
    changePublisher(payload: number): void {
      this.form.publisher_id = payload;
    },
    changeAuthors(payload: Array<number>): void {
      this.form.author_ids = payload;
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
    if(this.$route.params.id) {
      this.mode = 'edit'
    }
    if(this.mode === 'edit') {
      this.onFetchBookRecord(this.$route.params.id);
    }
  }
};