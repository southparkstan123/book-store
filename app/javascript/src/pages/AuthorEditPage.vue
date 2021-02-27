<template>
  <div class="min-h-screen flex items-center justify-center">
    <div v-if="!isLoading" class="max-w-md w-full space-y-8">
      <error-feedback :errors="errors" v-if="errors.length > 0"/>
      <form class="mt-8 space-y-6" @submit.prevent="onUpdateAuthorRecord">
        <div class="mt-8 grid grid-cols-1 gap-6 items-start">
          <div class="grid grid-cols-1 gap-6">
            <label class="block" for="name">
              <span class="text-gray-700">Name</span>
              <input class="block w-full mt-1" type="text" name="name" v-model="form.name"/>
            </label>
            <label class="block" for="description">
              <span class="text-gray-700">Description</span>
              <textarea
                class="mt-1 block w-full h-24"
                rows="3"
                placeholder="Abstract"
                v-model="form.description"
              ></textarea>
            </label>
          </div>
        </div>
        <div class="block">
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
        </div>
      </form>
    </div>
    <div v-else>
      <fade-transition appear>
        <h1 class="text-center text-2xl text-red-500">Loading...</h1>
      </fade-transition>
    </div>
  </div>
</template>

<script lang="ts">
import authorFormMixin from '@/mixins/authorFormMixin';
import FadeTransition from '@/components/FadeTransition.vue';
import ErrorFeedbackVue from '@/components/ErrorFeedback.vue';

export default {
  components: { 
    'fade-transition': FadeTransition,
    'error-feedback': ErrorFeedbackVue
  },
  mixins: [authorFormMixin],
};
</script>

<style scoped>

</style>