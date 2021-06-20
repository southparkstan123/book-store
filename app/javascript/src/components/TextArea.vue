<template>
  <div :class="className">
    <textarea 
      :class="inputFieldClass"
      :name="inputName" 
      :id="inputId" 
      :cols="cols" 
      :rows="rows"
      :readonly="isReadonly"
      :placeholder="(isRequired) ? `${placeholder} (Required)` : placeholder"
      @keyup="changeValue"
      :value="inputValue"
    ></textarea>
    <slot name="hints" />
    <slot name="error-feedback" />
  </div>
</template>

<script lang="ts">
import inputMixin from '@/mixins/inputMixin';

export default {
  mixins: [inputMixin],
  props: {
    isReadonly: {
      type: Boolean,
      default: false
    },
    cols: {
      type: String,
      default: '30'
    },
    rows: {
      type: String,
      default: '10'
    }
  }
};
</script>

<style scoped scss>
textarea {
  resize: none;
}
</style>