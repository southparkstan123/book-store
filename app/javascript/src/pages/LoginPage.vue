<template>
  <div
    id="login-page"
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <login-form />
    </div>
  </div>
</template>

<script lang="ts">
import LoginForm from '@/components/LoginForm.vue';
export default {
  components: {
    'login-form': LoginForm
  }
};
</script>

<style scoped>

</style>