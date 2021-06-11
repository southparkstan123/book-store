<template>
  <button 
    :disabled="isDisabled"
    :type="buttonType"
    :class="buttonClass"
    @click="onClick"
  >
    <slot name="icon"></slot>
    <slot name="text">Button</slot>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    buttonType: {
      type: String,
      default: 'button',
      validator: (s: string): boolean => ['submit', 'button'].includes(s)
    },
    textClass: {
      type: String,
      default: 'text-white'
    },
    backgroundClass: {
      type: String,
      default: 'btn'
    },
    disabledClass: {
      type: String,
      default: 'cursor-not-allowed'
    },
  },
  computed: {
    buttonClass(): string {
      const { isDisabled , backgroundClass, textClass, disabledClass} = this;
      return `${textClass} ${isDisabled ? `${backgroundClass} ${disabledClass}` : backgroundClass}`;
    },
  },
  methods: {
    onClick(): void{
      if(this.buttonType === 'button') {
        this.$emit('buttonClicked');
      }
    },
  },
};
</script>

<style scoped>

</style>