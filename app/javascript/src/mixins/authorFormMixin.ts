import { fetchRecordById } from '@/services/CRUDServices';
import { mapActions } from 'vuex';
import { AuthorForm } from '@/type';
import formMixin from '@/mixins/formMixin';

type AuthorFormState = {
  form: AuthorForm,
  isLoading: boolean,
  mode: 'add' | 'edit'
}

export default {
  mixins: [formMixin],
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
          this.$router.push('/authors');
        }
      } catch (error) {
        this.onHandleError(error);
      }
    },
    async onDeleteAuthor(): Promise<void> {
      try {
        this.isFormChanged = false;

        const confirm = await this.openConfirmModal('Are you sure?', 'Delete');

        if(confirm) {
          this.$store.dispatch('author/delete', { id: this.$route.params.id }).then(() => {
            this.$router.push('/authors');
          })
        }
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