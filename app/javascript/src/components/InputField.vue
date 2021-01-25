<template>
  <div :class="className">
    <input
      :id="inputId"
      :type="inputType"
      :class="inputFieldClass"
      :name="inputName"
      :placeholder="(isRequired) ? `${placeholder} (Required)` : placeholder"
      @keyup="changeValue"
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
export default {
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
    }
  },
  methods: {
    changeValue(event: { target: { value: string }}): void {
      this.$emit('changeValue', event.target.value);
    }
  }
};
</script>

<style scoped>
</style>