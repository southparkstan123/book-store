import { fetchRecordById } from '@/services/CRUDServices';
import { mapActions } from 'vuex';
import { PublisherForm } from '@/type';
import errorHandleMixin from '@/mixins/errorHandleMixin';

type PublisherFormState = {
  form: PublisherForm,
  isLoading: boolean,
  mode: 'add' | 'edit',
}

export default {
  mixins: [errorHandleMixin],
  data(): PublisherFormState {
    return {
      form: {
        name: '',
        description: '',
      },
      isLoading: false,
      mode: 'add',
    };
  },
  methods: {
    ...mapActions({
      openModal: 'modal/openModal',
      create: 'publisher/create',
      update: 'publisher/update'
    }),
    async onFetchPublisherRecord(id: number): Promise<void> {
      try {
        this.isLoading = true;
        const result = await fetchRecordById(id, 'publisher');
        const { name, description }  = result.data;

        this.form.name = name;
        this.form.description = description;
      } catch (error) {
        this.onHandleError(error);
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
        this.onHandleError(error);
      }
    },
    async onDeletePublisher(): Promise<void> {
      try {
        await this.openModal({
          type: 'confirm',
          title: 'Delete',
          message: 'Are you sure?',
          action: 'publisher/delete',
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
      this.onFetchPublisherRecord(this.$route.params.id);
    }
  }
};