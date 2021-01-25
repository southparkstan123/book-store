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
        <button
          id="login"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
        >
          Login
        </button>
      </div>
      <div class="text-sm text-blue-500">
        <a
          id="register"
          href="#"
          @click.prevent="toRegisterPage"
        >Register</a>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import InputField from '@/components/InputField.vue';
import { LoginForm } from '@/type';

type LoginFormState = LoginForm;

export default {
  components: {
    'input-field': InputField
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