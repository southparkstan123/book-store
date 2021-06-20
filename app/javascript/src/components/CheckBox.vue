<template>
  <label :class="className">
    <input
      :id="inputId"
      :type="'checkbox'"
      :class="inputFieldClass"
      :name="inputName"
      @input="changeValue"
      :value="inputValue"
      :checked="isChecked"
    />
    <slot name="label"/>
    <slot name="hints" />
    <slot name="error-feedback" />
  </label>
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
    inputValue: {
      type: Boolean,
      default: false
    },
    inputFieldClass: {
      type: String,
      default: 'form-checkbox'
    },
    className: {
      type: String,
      default: 'inline-flex items-center'
    }
  },
  methods: {
    changeValue(): void {
      this.$emit('changeValue', !this.inputValue);
    }
  }
};
</script>

<style scoped>

</style>