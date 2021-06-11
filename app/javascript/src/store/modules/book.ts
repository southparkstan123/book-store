import { 
  deleteRecordById, 
  updateRecordById,
  createRecord
} from '@/services/CRUDServices';

import { BookForm } from '@/type';

const namespaced = true;

const actions = {
  async delete({ dispatch }: { dispatch: Function }, payload: { id: number }): Promise<any> {
    try {
      const response = await deleteRecordById(payload.id, 'book');
      dispatch('modal/openModal', {
        title: 'Success',
        message: response.data.message,
        type: 'alert'
      }, { root: true });

      return response;
    } catch (error) {
      return dispatch('modal/openModal', {
        title: `${error.response.status} Error`,
        message: error.response.data.message,
        type: 'alert'
      }, { root: true });
    }
  },

  async create({ dispatch }: { dispatch: Function }, payload: { form: BookForm }): Promise<any> {
    const response = await createRecord(payload.form, 'book');
    
    dispatch('modal/openModal', {
      type: 'alert',
      message: response.data.message,
      title: 'Success!',
    },
    { root: true });

    return response;
  },

  async update({ dispatch }: { dispatch: Function }, payload: { id: number, form: BookForm }): Promise<any> {
    const response = await updateRecordById(payload.id, payload.form, 'book');
    
    dispatch('modal/openModal', {
      type: 'alert',
      message: response.data.message,
      title: 'Success!',
    },
    { root: true });

    return response;
  }
};

const store = {
  namespaced,
  actions
};

export default store;