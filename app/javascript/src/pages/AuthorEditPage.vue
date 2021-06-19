<template>
  <div class="min-h-screen flex items-center justify-center">
    <div v-if="!isLoading" class="max-w-md w-full space-y-8">
      <error-feedback :errors="errors" v-if="errors.length > 0"/> 
      <my-button
        v-if="mode === 'edit'"
        :backgroundClass="'inline-block'"
        :textClass="'text-black'"
        @buttonClicked="onDeleteAuthor()"
      >
        <span slot="text">Delete</span>
      </my-button>
      <form class="mt-8 space-y-6" @submit.prevent="onUpdateAuthorRecord">
        <div class="mt-8 grid grid-cols-1 gap-6 items-start">
          <div class="grid grid-cols-1 gap-6">
            <label class="block" for="name">
              <span class="text-gray-700">Name</span>
              <input-field
                :input-type="'text'"
                :name="'name'"
                :input-id="'name'"
                :placeholder="'Name'"
                :input-field-class="'block w-full mt-1'"
                :is-required="true"
                @changeValue="changeName"
                :input-value="form.name"
              />
            </label>
            <label class="block" for="description">
              <span class="text-gray-700">Description</span>
              <text-area
                :class="'mt-1 block w-full h-24'"
                :rows="'3'"
                :placeholder="'Abstract'"
                @changeValue="changeAbstract"
                :input-value="form.description"
                :is-required="true"
              ></text-area>
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
import authorFormMixin from '@/mixins/authorFormMixin';
import FadeTransition from '@/components/FadeTransition.vue';
import ErrorFeedbackVue from '@/components/ErrorFeedback.vue';
import Button from '@/components/Button.vue';
import TextArea from '@/components/TextArea.vue';
import InputField from '@/components/InputField.vue';

export default {
  components: { 
    'fade-transition': FadeTransition,
    'error-feedback': ErrorFeedbackVue,
    'my-button': Button,
    'text-area': TextArea,
    'input-field': InputField
  },
  mixins: [authorFormMixin],
  async beforeRouteLeave (to: any, from: any, next: any): Promise<any> {
    await this.beforeLeave(to, from, next);
  }
};
</script>

<style scoped>

</style>