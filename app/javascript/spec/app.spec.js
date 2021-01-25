/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { mount, createLocalVue, renderToString, config } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

config.showDeprecationWarnings = false;

// Use components
import Modal from '@/components/Modal.vue';
import LoginForm from '@/components/LoginForm.vue';
import RegistrationForm from '@/components/RegistrationForm.vue';

// Use pages
import LoginPage from '@/pages/LoginPage.vue';
import RegistrationPage from '@/pages/RegistrationPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import MainPage from '@/pages/MainPage.vue';

// Use app as a container
import app from '@/app.vue';

// Use modules
import user from '@/store/modules/user';
import modal from '@/store/modules/modal';

// Use router
import { routes } from '@/routes';

// Middleware
import guardRouter from '@/guardRouter';

// Create vue instance for testing
const localVue = createLocalVue();

// Use vue-router and vuex in local vue instance
localVue.use(Vuex);
localVue.use(VueRouter);

describe('app.vue', () => {
  let store;
  let localRouter;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        modal,
        user
      }
    });

    localRouter = new VueRouter({
      mode: 'history',
      routes
    });

    // Checking for a meta field in the global navigation guard
    guardRouter(localRouter, store);

    wrapper = mount(app, {
      store,
      localVue,
      router: localRouter
    });
  });

  describe('test for routing', () => {
    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy();
    });

    it('is redirect to Login page initially when the but have not logged in yet', () => {
      expect(wrapper.vm.$route.path).toBe('/signin');
      expect(wrapper.findComponent(LoginPage).exists()).toBeTruthy();
    });

    it('will redirect to Login page again when unauthorized', async () => {
      wrapper.vm.$router.replace('/');
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$route.path).toBe('/signin');
    });

    it('will redirect to Registration page', async () => {
      wrapper.vm.$router.replace('/signup');
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$route.path).toBe('/signup');
      expect(wrapper.findComponent(RegistrationPage).exists()).toBeTruthy();
    });

    it('will redirect to Not found page when route is not defined in router', async () => {
      wrapper.vm.$router.push('/somepage');
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$route.path).toBe('/somepage');
      expect(wrapper.findComponent(NotFoundPage).exists()).toBeTruthy();
    });
  });
});