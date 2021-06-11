<template>
  <div class="min-h-screen flex items-center justify-center">
    <div v-if="!isLoading" class="max-w-md w-full space-y-8">
      <error-feedback :errors="errors" v-if="errors.length > 0"/>
      <my-button
        v-if="mode === 'edit'"
        :backgroundClass="'inline-block'"
        :textClass="'text-black'"
        @buttonClicked="onDeletePublisher()"
      >
        <span slot="text">Delete</span>
      </my-button>
      <form class="mt-8 space-y-6" @submit.prevent="onUpdatePublisherRecord">
        <div class="mt-8 grid grid-cols-1 gap-6 items-start">
          <div class="grid grid-cols-1 gap-6">
            <label class="block" for="name">
              <span class="text-gray-700">Name</span>
              <input class="block w-full mt-1" type="text" name="name" v-model="form.name" @change="onChangeForm"/>
            </label>
            <label class="block" for="description">
              <span class="text-gray-700">Description</span>
              <textarea
                class="mt-1 block w-full h-24"
                rows="3"
                placeholder="Abstract"
                v-model="form.description"
                @change="onChangeForm"
              ></textarea>
            </label>
          </div>
        </div>
        <div class="block">
          <my-button
            :isDisabled="!isFormChanged" 
            :buttonType="'submit'" 
            :textClass="'text-sm font-medium justify-center text-white'"
            :backgroundClass="'group relative bg-green-300 w-full flex py-2 px-4 border border-transparent rounded-md'"
          >
            <span slot="text">Submit</span>
          </my-button>
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
import publisherFormMixin from '@/mixins/publisherFormMixin';
import FadeTransition from '@/components/FadeTransition.vue';
import ErrorFeedbackVue from '@/components/ErrorFeedback.vue';
import Button from '@/components/Button.vue';

export default {
  components: { 
    'fade-transition': FadeTransition,
    'error-feedback': ErrorFeedbackVue,
    'my-button': Button
  },
  mixins: [publisherFormMixin],
  async beforeRouteLeave (to: any, from: any, next: any): Promise<any> {
    if(this.isFormChanged === true) {
      const answer = await this.openConfirmModal({
        type: 'confirm',
        title: 'Unsaved changes',
        message: 'Do you really want to leave?',
      });

      if (answer) {
        next();
      } 
    } else {
      next();
    }
  }
};
</script>

<style scoped>

</style>