import { 
  deleteRecordById, 
  updateRecordById,
  createRecord
} from '@/services/CRUDServices';

import { AuthorForm } from '@/type';

const namespaced = true;

const actions = {
  async delete({ dispatch }: { dispatch: Function }, payload: { id: number }): Promise<any> {
    try {
      const response = await deleteRecordById(payload.id, 'author');
      return dispatch('modal/openModal', {
        title: 'Success',
        message: response.data.message,
        type: 'alert'
      }, { root: true });
    } catch (error) {
      return dispatch('modal/openModal', {
        title: `${error.response.status} Error`,
        message: error.response.data.message,
        type: 'alert'
      }, { root: true });
    }
  },

  async create({ dispatch }: { dispatch: Function }, payload: { form: AuthorForm }): Promise<any> {
    const response = await createRecord(payload.form, 'author');
    return dispatch('modal/openModal', {
      type: 'alert',
      message: response.data.message,
      title: 'Success!',
    },
    { root: true });
  },

  async update({ dispatch }: { dispatch: Function }, payload: { id: number, form: BookForm }): Promise<any> {
    const response = await updateRecordById(payload.id, payload.form, 'author');
    return dispatch('modal/openModal', {
      type: 'alert',
      message: response.data.message,
      title: 'Success!',
    },
    { root: true });
  }
};

const store = {
  namespaced,
  actions
};

export default store;