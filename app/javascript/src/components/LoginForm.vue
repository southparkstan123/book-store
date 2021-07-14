<template>
  <form
    class="mt-8 space-y-6"
    @submit.prevent="onLogin"
  >
    <input-field
      :input-type="'text'"
      :name="'username'"
      :input-id="'username'"
      :placeholder="'Username'"
      :input-field-class="'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 focus:z-10 sm:text-sm'"
      @changeValue="onChangeUsername"
    />
    <input-field
      :input-type="'password'"
      :name="'password'"
      :input-id="'password'"
      :placeholder="'Password'"
      :input-field-class="'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 focus:z-10 sm:text-sm'"
      @changeValue="onChangePassword"
    />
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <my-button
          :buttonType="'submit'"
          :textClass="'text-sm font-medium'"
          :backgroundClass="'group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
        >
          <span slot="text">Login</span>
        </my-button>
      </div>
      <div class="flex items-center">
        <my-button
          @buttonClicked="toRegisterPage"
          :buttonType="'button'"
          :textClass="'text-sm text-blue-500'"
          :backgroundClass="' focus:outline-none'"
        >
          <span slot="text">Register</span>
        </my-button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import InputField from '@/components/InputField.vue';
import { LoginForm } from '@/type';
import Button from '@/components/Button.vue';

type LoginFormState = LoginForm;

export default {
  components: {
    'input-field': InputField,
    'my-button': Button
  },
  computed: {
    ...mapGetters({
      token: 'user/getUserToken'
    })
  },
  data(): LoginFormState {
    return {
      form: {
        username: '',
        password: ''
      } 
    };
  },
  methods: {
    ...mapActions({
      signin: 'user/signin'
    }),
    async onLogin(): Promise<void> {
      await this.signin(this.form);
      if(this.token){
        this.$router.replace('/');
      }
    },
    onChangeUsername(value: string): void {
      this.form.username = value;
    },
    onChangePassword(value: string): void {
      this.form.password = value;
    },
    toRegisterPage(): void {
      this.$router.push('/signup');
    }
  },
};
</script>

<style scoped>
</style>