import { Modal, OpenModalPayload } from '@/type';

const state: Modal = {
  visible: false,
  type: 'alert',
  message: '',
  title: '',
  component: '',
  params: {},
  action: '',
  payload: {}
};

const namespaced = true;

const actions = {
  closeModal({ commit }: {commit : Function}): void {
    commit('CLOSE_MODAL');
  },
  openModal({ commit }: {commit : Function}, payload: OpenModalPayload): void {
    commit('OPEN_MODAL', payload);
  }
};

const mutations = {
  OPEN_MODAL(state: Modal, payload: OpenModalPayload): void {
    state.visible = true,
    state.title = payload.title,
    state.type = payload.type,
    state.component = payload.component,
    state.message = payload.message,
    state.params = (payload.params) ? payload.params : {};
    state.action = (payload.action) ? payload.action : '';
    state.payload = (payload.payload) ? payload.payload : {};
  },
  CLOSE_MODAL(state: Modal): void {
    state.visible = false,
    state.message = '',
    state.title = '',
    state.type = 'alert',
    state.component = '',
    state.params = {},
    state.action = '',
    state.payload = {};
  }
};

const getters = {
  getModalObject: (state: Modal): Modal => state,
  getParams: (state: Modal): any => state.params
};

const store = {
  state,
  namespaced,
  actions,
  mutations,
  getters
};

export default store;