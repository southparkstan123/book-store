import { fetchRecordById } from '@/services/CRUDServices';
import { mapActions } from 'vuex';
import { AuthorForm } from '@/type';
import errorHandleMixin from '@/mixins/errorHandleMixin';

type AuthorFormState = {
  form: AuthorForm,
  isLoading: boolean,
  mode: 'add' | 'edit',
}

export default {
  mixins: [errorHandleMixin],
  data(): AuthorFormState {
    return {
      form: {
        name: '',
        description: '',
      },
      isLoading: false,
      mode: 'add'
    };
  },
  methods: {
    ...mapActions({
      openModal: 'modal/openModal',
      create: 'author/create',
      update: 'author/update'
    }),
    async onFetchAuthorRecord(id: number): Promise<void> {
      try {
        this.isLoading = true;
        const result = await fetchRecordById(id, 'author');
        const { name, description }  = result.data;

        this.form.name = name;
        this.form.description = description;
      } catch (error) {
        this.onHandleError(error);
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
        this.onHandleError(error);
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
    }
  },
  mounted(): void {
    if(this.$route.params.id) {
      this.mode = 'edit';
    }
    if(this.mode === 'edit') {
      this.onFetchAuthorRecord(this.$route.params.id);
    }
  }
};