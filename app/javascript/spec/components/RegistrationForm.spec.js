/* eslint-disable no-undef */
import Vuex from 'vuex';
import { mount, createLocalVue, config } from '@vue/test-utils';
import RegistrationForm from '@/components/RegistrationForm.vue';
import { register } from '@/services/AuthServices';
import flushPromises from 'flush-promises';

config.showDeprecationWarnings = false;

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock('@/services/AuthServices', () => {
  return {
    register: jest.fn()
  };
});

describe('RegistrationForm.vue', () => {
  describe('appearance', () => {
    it('have username, email, password and password confirmation fields', () => {
      const wrapper = mount(RegistrationForm);
      expect(wrapper.find('form').find('input#username').exists()).toBe(true);
      expect(wrapper.find('form').find('input#password').exists()).toBe(true);
      expect(wrapper.find('form').find('input#email').exists()).toBe(true);
      expect(wrapper.find('form').find('input#confirmed-password').exists()).toBe(true);
    });

    it('have register and back to login button field', () => {
      const wrapper = mount(RegistrationForm);
      expect(wrapper.find('button#register').exists()).toBe(true);
      expect(wrapper.find('a#to-login-page').exists()).toBe(true);
    });
  });

  describe('routes', () => {
    it('toLoginPage will be called by clicking registration button', async () => {
      const toLoginPageSpy = jest.fn();
    
      const wrapper = mount(RegistrationForm, {
        methods: {
          toLoginPage: toLoginPageSpy
        },
        mocks: {
          $router: { 
            push: jest.fn() 
          }
        }
      });
    
      const button = wrapper.find('a#to-login-page');
      await button.trigger('click');
      expect(toLoginPageSpy).toHaveBeenCalled();
    });
    
    it('go to login page button by clicking registration button', async () => {
      const wrapper = mount(RegistrationForm, {
        mocks: {
          $router: { 
            push: jest.fn() 
          }
        },
      });
    
      const button = wrapper.find('a#to-login-page');
      await button.trigger('click');
    
      expect(wrapper.vm.$router.push).toHaveBeenCalled();
      expect(wrapper.vm.$router.push.mock.calls[0][0]).toEqual('/signin');
    });
  });

  describe('register action error', () => {
    let store;
    let actions;

    beforeEach(() => {
      actions = {
        'modal/openModal': jest.fn()
      };
      store = new Vuex.Store({
        actions
      });

      register.mockImplementation(() => {
        return Promise.reject(
          {
            response: {
              data: {
                message: 'Error occurs!',
                errors: [
                  'Error1',
                  'Error2'
                ],
              },
              status: 400
            }
          }
        );
      });   
    });



    it('have submit form', async () => {
      const wrapper = mount(RegistrationForm, {
        store,
        localVue
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

      expect(actions['modal/openModal'].mock.calls).toHaveLength(1);
      expect(actions['modal/openModal'].mock.calls[0][1]).toEqual({
        type: 'alert',
        message: 'Error occurs!',
        title: '400 Error',
      });

      expect(wrapper.vm.$data.errors.length).toBeGreaterThan(0);
    });
  });
});
