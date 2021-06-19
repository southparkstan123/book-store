<template>
  <textarea 
    :class="className"
    :name="name" 
    :id="id" 
    :cols="cols" 
    :rows="rows"
    :readonly="isReadonly"
    :placeholder="(isRequired) ? `${placeholder} (Required)` : placeholder"
    @keyup="changeValue"
    :value="inputValue"
  ></textarea>
</template>

<script lang="ts">
import inputMixin from '@/mixins/inputMixin';

export default {
  mixins: [inputMixin],
  props: {
    id: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    isReadonly: {
      type: Boolean,
      default: false
    },
    isRequired: {
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
    },
    placeholder: {
      type: String,
      default: 'Placeholder'
    },
    inputValue: {
      type: String || Boolean,
      default: ''
    }
  }
};
</script>

<style scoped scss>
textarea {
  resize: none;
}
</style>