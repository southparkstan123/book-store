import { fetchRecordById } from '@/services/CRUDServices';
import { mapActions } from 'vuex';
import { PublisherForm } from '@/type';

type PublisherFormState = {
  form: PublisherForm,
  isLoading: boolean,
  mode: 'add' | 'edit',
  errors: Array<string>
}

export default {
  data(): PublisherFormState {
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
      create: `publisher/create`,
      update: `publisher/update`
    }),
    async onFetchPublisherRecord(id: number): Promise<void> {
      try {
        this.isLoading = true;
        const result = await fetchRecordById(id, 'publisher');
        const { name, description }  = result.data;

        this.form.name = name;
        this.form.description = description;
      } catch (error) {
        const { status }  = error.response;
        const { message } = error.response.data;

        this.openModal({
          type: 'alert',
          message,
          title: `${status} Error`,
        });
      } finally {
        this.isLoading = false;
      }
    },
    async onUpdatePublisherRecord(): Promise<void> {
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

        this.$router.push('/publishers');
      } catch (error) {
        const { status }  = error.response;
        const { message , errors } = error.response.data;

        this.openModal({
          type: 'alert',
          message,
          title: `${status} Error`,
        });

        this.errors = errors;
      }
    }
  },
  mounted(): void {
    if(this.$route.params.id) {
      this.mode = 'edit'
    }
    if(this.mode === 'edit') {
      this.onFetchPublisherRecord(this.$route.params.id);
    }
  }
};