import { signin, verify, signout } from '@/services/AuthServices';
import { LoginForm, UserInfo, UserState } from '@/type';

const state: UserState = {
  token: null,
  userInfo: null
};

const namespaced = true;

const actions = {
  async signin({ dispatch }: { dispatch: Function }, user: LoginForm): Promise<any> {
    try {
      const response = await signin(user);
      return dispatch('attemp', response.data.token);
    } catch (error) {
      return dispatch('modal/openModal', {
        title: `${error.response.status} Error`,
        message: error.response.data.message,
        type: 'alert'
      }, { root: true });
    }
  },

  async attemp({ commit, state, dispatch }: { commit: Function, state: UserState , dispatch: Function }, token: string | null): Promise<any> {
    if (token) {
      commit('SET_TOKEN', token);
    }

    if (!state.token) {
      return;
    }

    try {
      const payload = await verify();
      commit('SET_USER_INFO', payload.data);
    } catch (error) {
      commit('SET_TOKEN', null);
      commit('SET_USER_INFO', null);
      return dispatch('modal/openModal', {
        title: `${error.response.status} Error`,
        message: error.response.data.message,
        type: 'alert'
      }, { root: true });
    }
  },

  async signout({ commit, dispatch }: { commit: Funcrtion, dispatch: Function }): Promise<any> {
    try {
      await signout();
      commit('SET_TOKEN', null);
      commit('SET_USER_INFO', null);
    } catch (error) {
      const { errorObject } = error.response;
      return dispatch('modal/openModal', {
        title: `${errorObject.status} Error`,
        message: errorObject.data.message,
        type: 'alert'
      }, { root: true });
    }
  }
};

const mutations = {
  SET_USER_INFO(state: UserState, user: UserInfo): void {
    state.userInfo = user;
  },
  SET_TOKEN(state: UserState, token: string): void {
    state.token = token;
  }
};

const getters = {
  getUserInfo: (state: UserState): UserInfo => state.userInfo,
  isAuthenticated: (state: UserState): boolean => (state.userInfo !== null && state.token !== null),
  getUserToken: (state: UserState): string => state.token
};

const store = {
  state,
  namespaced,
  actions,
  mutations,
  getters,
};

export default store;
