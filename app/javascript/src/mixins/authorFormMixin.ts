import { fetchRecordById } from '@/services/CRUDServices';
import { mapActions } from 'vuex';
import { AuthorForm } from '@/type';

type AuthorFormState = {
  form: AuthorForm,
  isLoading: boolean,
  mode: 'add' | 'edit',
  errors: Array<string>
}

export default {
  data(): AuthorFormState {
    return {
      form: {
        name: '',
        description: '',
      },
      isLoading: false,
      mode: 'add',
      errors: []
    };
  },
  methods: {
    ...mapActions({
      openModal: 'modal/openModal',
      create: `author/create`,
      update: `author/update`
    }),
    async onFetchAuthorRecord(id: number): Promise<void> {
      try {
        this.isLoading = true;
        const result = await fetchRecordById(id, 'author');
        const { name, description }  = result.data;

        this.form.name = name;
        this.form.description = description;
      } catch (error) {
        onHandleError(error);
      } finally {
        this.isLoading = false;
      }
    },
    async onUpdateAuthorRecord(): Promise<void> {
      try {
        if (this.mode === 'edit') {
          await this.update({
            id: this.$route.params.id, 
            form: this.form
          });
        } else {
          await this.create({
            form: this.form
          });
        }

        this.$router.push('/authors');
      } catch (error) {
        const { errors } = error.response.data;
        onHandleError(error);
        this.errors = errors;
      }
    },
    async onDeleteAuthor(): Promise<void> {
      try {
        await this.openModal({
          type: 'confirm',
          title: 'Delete',
          message: 'Are you sure?',
          action: 'author/delete',
          payload: { id: this.$route.params.id }
        });
      } catch (error) {
        this.onHandleError(error);
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
    if(this.$route.params.id) {
      this.mode = 'edit'
    }
    if(this.mode === 'edit') {
      this.onFetchAuthorRecord(this.$route.params.id);
    }
  }
};