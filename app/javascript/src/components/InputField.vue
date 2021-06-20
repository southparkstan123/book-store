<template>
  <div :class="className">
    <input
      :id="inputId"
      :type="inputType"
      :class="inputFieldClass"
      :name="inputName"
      :placeholder="(isRequired) ? `${placeholder} (Required)` : placeholder"
      @keyup="changeValue"
      :value="inputValue"
    />
    <slot name="hints" />
    <slot name="error-feedback" />
  </div>
</template>

<script lang="ts">
import inputMixin from '@/mixins/inputMixin';

export default {
  mixins: [inputMixin],
  props: {
    inputType: {
      type: String,
      validator: (type: string): boolean => ['text', 'email', 'password'].includes(type),
      default: 'text'
    }
  }
};
</script>

<style scoped>
</style>