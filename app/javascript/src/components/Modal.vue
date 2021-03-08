<template>
  <FadeTransition>
    <div class="fixed z-100 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 transition-opacity"
          aria-hidden="true"
        >
          <div class="absolute inset-0 bg-gray-500 opacity-75" />
        </div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >&#8203;</span>
        <SlideTransition>
          <div
            v-if="showModalContent"
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                >
                  <slot name="header">
                    <h3
                      id="modal-headline"
                      class="text-lg leading-6 font-medium text-gray-900"
                    >
                      Title
                    </h3>
                  </slot>
                  <div class="mt-2">
                    <slot
                      v-if="type === 'form'"
                      name="form-body"
                    />
                    <slot
                      v-else
                      name="message-body"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
            >
              <div
                v-show="type !== 'form'"
                class="modal-footer"
              >
                <slot
                  v-if="type === 'confirm'"
                  name="confirm-footer"
                >
                  <button
                    type="button"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    @click="onConfirm"
                  >
                    OK
                  </button>
                  <button
                    type="button"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    @click="close"
                  >
                    Cancel
                  </button>
                </slot>
                <slot
                  v-else
                  name="footer"
                >
                  <button
                    type="button"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    @click="close"
                  >
                    OK
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </SlideTransition>
      </div>
    </div>
  </FadeTransition>
</template>

<script lang="ts">
import { mapActions } from 'vuex';
import { ModelType } from '@/type';
import FadeTransition from '@/components/FadeTransition.vue';
import SlideTransition from '@/components/SlideTransition.vue';

type ModalState = {
  showModalContent: boolean
}

export default {
  components: {
    FadeTransition,
    SlideTransition,
  },
  props: {
    type: {
      type: String,
      default: 'alert',
      validator: (type: ModelType): boolean => ['alert', 'confirm', 'form'].includes(type),
    },
  },
  data(): ModalState {
    return {
      showModalContent: false,
    };
  },
  created(): void {
    setTimeout(() => {
      this.showModalContent = true;
    }, 100);
  },
  methods: {
    ...mapActions({
      closeModal: 'modal/closeModal',
    }),
    close(): void {
      this.showModalContent = false;
      setTimeout(() => {
        this.closeModal();
      }, 300);
    },
    onConfirm(): void {
      this.$emit('confirm');
    },
  },
};
</script>

<style scoped>
.modal {
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
}
.btn-close {
    border: none 0;
    font-size: 20px;
    padding: 0px;
    cursor: pointer;
    font-weight: bold;
    color: gray;
    background-color: transparent;
}
</style>
