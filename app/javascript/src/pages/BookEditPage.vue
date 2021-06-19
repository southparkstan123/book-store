
<template>
  <div class="min-h-screen flex items-center justify-center">
    <div v-if="!isLoading" class="max-w-md w-full space-y-8">
      <error-feedback :errors="errors" v-if="errors.length > 0"/>
      <my-button
        v-if="mode === 'edit'"
        :backgroundClass="'inline-block'"
        :textClass="'text-black'"
        @buttonClicked="onDeleteBook()"
      >
        <span slot="text">Delete</span>
      </my-button>
      <form class="mt-8 space-y-6" @submit.prevent="onUpdateBookRecord">
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
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
            <label class="block" for="abtract">
              <span class="text-gray-700">Abstract</span>
              <text-area
                :class="'mt-1 block w-full h-24'"
                :rows="'3'"
                :placeholder="'Abstract'"
                @changeValue="changeAbstract"
                :input-value="form.abstract"
                :is-required="true"
              ></text-area>
            </label>
            <label class="block" for="price">
              <span class="text-gray-700">Price</span>
              <input 
                class="block w-full mt-1" 
                type="number" 
                name="price" 
                step="0.1" 
                min="0" 
                v-model.number="form.price" 
                @change="onChangeForm"
              />
            </label>
          </div>
          <div class="grid grid-cols-1 gap-6">
            <label class="block" for="publisher">
              <span class="text-gray-700">Publisher</span>
              <publisher-dropdown 
                @selectPublisher="changePublisher"
                :selectedItem="form.publisher_id"
              ></publisher-dropdown>
              
            </label>
            <label class="block" for="authors">
              <span class="text-gray-700">Authors</span>
              <author-select-option
                @selectedAuthors="changeAuthors"
                :selectedItems="form.author_ids"
              >
              </author-select-option>
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
import bookFormMixin from '@/mixins/bookFormMixin';
import FadeTransition from '@/components/FadeTransition.vue';
import AuthorSelectOption from '@/components/AuthorSelectOption.vue';
import PublisherDropdown from '@/components/PublisherDropdown.vue';
import ErrorFeedbackVue from '@/components/ErrorFeedback.vue';
import Button from '@/components/Button.vue';
import TextArea from '@/components/TextArea.vue';
import InputField from '@/components/InputField.vue';

export default {
  components: { 
    'fade-transition': FadeTransition,
    'author-select-option': AuthorSelectOption,
    'publisher-dropdown': PublisherDropdown,
    'error-feedback': ErrorFeedbackVue,
    'my-button': Button,
    'text-area': TextArea,
    'input-field': InputField
  },
  mixins: [bookFormMixin],
  async beforeRouteLeave (to: any, from: any, next: any): Promise<any> {
    await this.beforeLeave(to, from, next);
  }
};
</script>

<style scoped>

</style>