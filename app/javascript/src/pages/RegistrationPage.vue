<template>
  <div
    id="registration-page"
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <registration-form />
    </div>
  </div>
</template>

<script lang="ts">
import RegistrationForm from '@/components/RegistrationForm.vue';
export default {
  components: {
    'registration-form': RegistrationForm
  }
};
</script>

<style scoped>

</style>