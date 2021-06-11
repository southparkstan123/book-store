import { fetchRecordById } from '@/services/CRUDServices';
import { mapActions } from 'vuex';
import { PublisherForm } from '@/type';
import errorHandleMixin from '@/mixins/errorHandleMixin';

type PublisherFormState = {
  form: PublisherForm,
  isLoading: boolean,
  mode: 'add' | 'edit',
  isFormChanged: boolean
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
      isFormChanged: false
    };
  },
  methods: {
    ...mapActions({
      openModal: 'modal/openModal',
      openConfirmModal: 'modal/openConfirmModal',
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

          if (response.status === 200 | 201) {
            this.$router.push('/publishers');
          }
        }
      } catch (error) {
        this.onHandleError(error);
      }
    },
    async onDeletePublisher(): Promise<void> {
      try {
        const confirm = await this.openConfirmModal({
          type: 'confirm',
          title: 'Delete',
          message: 'Are you sure?'
        });

        if(confirm) {
          this.$store.dispatch('publisher/delete', { id: this.$route.params.id }).then(() => {
            this.$router.push('/publishers');
          })
        }
      } catch (error) {
        this.onHandleError(error);
      }
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
      this.onFetchPublisherRecord(this.$route.params.id);
    }
  }
};