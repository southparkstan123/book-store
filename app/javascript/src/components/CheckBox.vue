<template>
  <div :class="className">
    <input
      :id="inputId"
      :type="'checkbox'"
      :class="inputFieldClass"
      :name="inputName"
      @keyup="changeValue"
      :value="inputValue"
      :checked="isChecked"
    />
    <slot name="label"></slot>
    <slot name="hints" />
    <slot name="error-feedback" />
  </div>
</template>

<script lang="ts">
import inputMixin from '@/mixins/inputMixin';

export default {
  mixins: [inputMixin],
  props: {
    isChecked: {
      type: Boolean,
      default: false
    },
  },
};
</script>

<style scoped>

</style>