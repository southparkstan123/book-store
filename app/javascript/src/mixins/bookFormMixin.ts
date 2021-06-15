import { fetchRecordById } from '@/services/CRUDServices';
import { mapActions } from 'vuex';
import { BookForm } from '@/type';
import formMixin from '@/mixins/formMixin';

type BookFormState = {
  form: BookForm,
  isLoading: boolean,
  mode: 'add' | 'edit',
  isFormChanged: boolean
}

export default {
  mixins: [formMixin],
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
      mode: 'add'
    };
  },
  methods: {
    ...mapActions({
      openModal: 'modal/openModal',
      create: 'book/create',
      update: 'book/update'
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
        this.isFormChanged = false;
        let response = {};

        if (this.mode === 'edit') {
          response = await this.update({
            id: this.$route.params.id, 
            form: this.form
          });
        } else {
          response = await this.create({
            form: this.form
          });
        }

        if (response.status === 200 | 201) {
          this.$router.push('/books');
        }

      } catch (error) {
        this.onHandleError(error);
      }
    },
    async onDeleteBook(): Promise<void> {
      const confirm = await this.openModal({
        type: 'confirm',
        title: 'Delete',
        message: 'Are you sure?'
      });

      if(confirm) {
        this.$store.dispatch('book/delete', { id: this.$route.params.id }).then(() => {
          this.$router.push('/books');
        })
      }
    },
    changePublisher(payload: number): void {
      this.form.publisher_id = payload;
      this.onChangeForm();
    },
    changeAuthors(payload: Array<number>): void {
      this.form.author_ids = payload;
      this.onChangeForm();
    },
    onChangeForm(): void {
      this.isFormChanged = true;
    }
  },
  mounted(): void {
    if(this.$route.params.id) {
      this.mode = 'edit';
    }
    if(this.mode === 'edit') {
      this.onFetchBookRecord(this.$route.params.id);
    }
  }
};