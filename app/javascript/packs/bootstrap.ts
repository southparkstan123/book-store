import TurbolinksAdapter from 'vue-turbolinks';
import Vue from 'vue/dist/vue.esm';
import App from '@/app.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import router from '@/routes';
import store from '@/store';
import guardedRouter from '@/guardRouter';

Vue.use(TurbolinksAdapter);
Vue.use(VueRouter);
Vue.use(Vuex);

import 'stylesheets/application';

const globalStore = new Vuex.Store(store);

// Checking for a meta field in the global navigation guard
guardedRouter(router, globalStore);

document.addEventListener('turbolinks:load', () => {
  globalStore.dispatch('user/attemp', localStorage.getItem('token')).then(() => {
    new Vue({
      router,
      store: globalStore,
      render: h => h(App)
    }).$mount('#app');
  }).catch(() => {
    this.$router.push({
      path: '/signin'
    });
  });
});