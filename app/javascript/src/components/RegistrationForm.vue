<template>
  <div>
    <error-feedback :errors="errors" />
    <form
      class="mt-8 space-y-6"
      @submit.prevent="onRegister"
    >
      <input-field
        :input-type="'text'"
        :name="'username'"
        :input-id="'username'"
        :placeholder="'Username'"
        :input-field-class="'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 focus:z-10 sm:text-sm'"
        :is-required="true"
        @changeValue="onChangeUsername"
      />
      <input-field
        :input-type="'email'"
        :name="'email'"
        :input-id="'email'"
        :placeholder="'Email'"
        :input-field-class="'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 focus:z-10 sm:text-sm'"
        @changeValue="onChangeEmail"
      />
      <input-field
        :input-type="'password'"
        :name="'password'"
        :input-id="'password'"
        :placeholder="'Password'"
        :input-field-class="'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 focus:z-10 sm:text-sm'"
        :is-required="true"
        @changeValue="onChangePassword"
      />
      <input-field
        :input-type="'password'"
        :name="'confirmedPassword'"
        :input-id="'confirmed-password'"
        :placeholder="'Confirm Password'"
        :input-field-class="'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 focus:z-10 sm:text-sm'"
        :is-required="true"
        @changeValue="onChangePasswordConfirmation"
      />
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <button
            id="register"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            Register
          </button>
        </div>
        <div class="text-sm text-blue-500">
          <a
            id="to-login-page"
            href="#"
            @click.prevent="toLoginPage"
          >Back to login page</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { RegistrationForm } from '@/type';
import { mapActions } from 'vuex';
import { register } from '@/services/AuthServices';
import ErrorFeedback from '@/components/ErrorFeedback.vue';
import InputField from '@/components/InputField.vue';
import formMixin from '@/mixins/formMixin';

type RegistrationFormState = RegistrationForm;

export default {
  mixins: [formMixin],
  components: {
    'error-feedback': ErrorFeedback,
    'input-field': InputField
  },
  data(): RegistrationFormState {
    return {
      form: {
        username: '',
        password: '',
        email: '',
        password_confirmation: '',
      }
    };
  },
  methods: {
    ...mapActions({
      openModal: 'modal/openModal',
    }),
    async onRegister(): Promise<void> {
      try {
        const response = await register(this.form);
        this.openSuccessModal(response.data.message, 'Success!');
        this.$router.push('/signin');
      } catch (error) {
        this.onHandleError(error);
      }
    },
    onChangeUsername(value: string): void {
      this.form.username = value;
      this.onChangeForm();
    },
    onChangeEmail(value: string): void {
      this.form.email = value;
      this.onChangeForm();
    },
    onChangePassword(value: string): void {
      this.form.password = value;
      this.onChangeForm();
    },
    onChangePasswordConfirmation(value: string): void {
      this.form.password_confirmation = value;
      this.onChangeForm();
    },
    toLoginPage(): void {
      this.$router.push('/signin');
    },
  }
};
</script>

<style scoped>
</style>