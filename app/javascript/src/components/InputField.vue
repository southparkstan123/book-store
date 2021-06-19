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
    >
    <slot
      v-if="inputType === 'checkbox'"
      name="label-for-checkbox"
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
    inputId: {
      type: String,
      default: ''
    },
    inputName: {
      type: String,
      default: ''
    },
    inputType: {
      type: String,
      validator: (type: string): boolean => ['text', 'email', 'password'].includes(type),
      default: 'text'
    },
    placeholder: {
      type: String,
      default: 'Placeholder'
    },
    className: {
      type: String,
      default: 'form-group'
    },
    inputFieldClass: {
      type: String,
      default: 'form-control'
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    inputValue: {
      type: String || Boolean,
      default: ''
    }
  }
};
</script>

<style scoped>
</style>