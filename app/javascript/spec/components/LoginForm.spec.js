/* eslint-disable no-undef */
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { mount, createLocalVue, config } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';
import flushPromises from 'flush-promises';

config.showDeprecationWarnings = false;

// Use router
import { routes } from '@/routes';

// Middleware
import guardRouter from '@/guardRouter';

const localVue = createLocalVue();
// Use vue-router and vuex in local vue instance
localVue.use(Vuex);
localVue.use(VueRouter);

jest.mock('@/services/APIServices', () => {
  return {
    signin: jest.fn()
  };
});

describe('LoginForm.vue', () => {
  describe('appearance', () => {
    it('have username and password field', () => {
      const wrapper = mount(LoginForm);
      expect(wrapper.find('form').find('input#username').exists()).toBe(true);
      expect(wrapper.find('form').find('input#password').exists()).toBe(true);
    });

    it('have login and register button field', () => {
      const wrapper = mount(LoginForm);
      expect(wrapper.find('button#login').exists()).toBe(true);
      expect(wrapper.find('a#register').exists()).toBe(true);
    });
  });

  describe('routes', () => {
    it('toRegisterPage will be called by clicking registration button', async () => {
      const toRegisterPageSpy = jest.fn();
      const wrapper = mount(LoginForm, {
        methods: {
          toRegisterPage: toRegisterPageSpy
        }
      });

      const button = wrapper.find('a#register');
      await button.trigger('click');
      expect(toRegisterPageSpy).toHaveBeenCalled();
    });

    it('go to registration page button by clicking registration button', async () => {
      const wrapper = mount(LoginForm, {
        mocks: {
          $router: { 
            push: jest.fn() 
          }
        },
      });

      const button = wrapper.find('a#register');
      await button.trigger('click');

      expect(wrapper.vm.$router.push).toHaveBeenCalled();
      expect(wrapper.vm.$router.push.mock.calls[0][0]).toEqual('/signup');
    });
  });

  describe('login action', () => {
    let store;
    let actions;
    let getters;
    let localRouter;

    beforeEach(() => {
      actions = {
        'user/signin': jest.fn((form) => {
          return Promise.resolve(
            {
              'user': {
                'username': form.username,
                'email': form.email,
                'id': 1
              },
              'token': 'fake_token'
            }
          );
        }),
        'modal/openModal': jest.fn()
      };

      getters = {
        'user/getUserToken': () => null
      };

      localRouter = new VueRouter({
        mode: 'history',
        routes
      });
    
      // Checking for a meta field in the global navigation guard
            
      store = new Vuex.Store({
        actions,
        getters
      });
            
      guardRouter(localRouter, store);

    });

    it('have submit form with username password', async () => {
      const wrapper = mount(LoginForm, {
        store,
        localVue,
        router: localRouter
      });

      const form = { 
        username: 'testing', 
        password: 'testing1234'
      }; 

      await wrapper.setData({ 
        form
      });
      await wrapper.find('form').trigger('submit.prevent');

      await flushPromises();

      expect(actions['user/signin'].mock.calls).toHaveLength(1);
      expect(actions['user/signin'].mock.calls[0][1]).toEqual(form);

    });
  });
});
