import { Modal, OpenModalPayload } from '@/type';

const state: Modal = {
  visible: false,
  type: 'alert',
  message: '',
  title: '',
  component: '',
  resolvePromise: undefined
};

const namespaced = true;

const actions = {
  closeModal({ commit }: {commit : Function}): void {
    commit('CLOSE_MODAL');
  },
  openModal({ commit }: {commit : Function}, payload: OpenModalPayload): Promise<void> {
    commit('OPEN_MODAL', payload);

    return new Promise((resolve, reject) => {
      this.resolvePromise = resolve
    });
  },
  onConfirm({ commit }: {commit : Function}){
    commit('CLOSE_MODAL');
    this.resolvePromise(true);
  },
  onReject({ commit }: {commit : Function}){
    commit('CLOSE_MODAL');
    this.resolvePromise(false);
  }
};

const mutations = {
  OPEN_MODAL(state: Modal, payload: OpenModalPayload): void {
    state.visible = true;
    state.title = payload.title;
    state.type = payload.type;
    state.component = payload.component;
    state.message = payload.message;
  },
  CLOSE_MODAL(state: Modal): void {
    state.visible = false;
    state.message = '';
    state.title = '';
    state.type = 'alert';
    state.component = '';
  }
};

const getters = {
  getModalObject: (state: Modal): Modal => state
};

const store = {
  state,
  namespaced,
  actions,
  mutations,
  getters
};

export default store;