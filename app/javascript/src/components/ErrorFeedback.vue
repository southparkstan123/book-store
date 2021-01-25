<template>
  <span
    v-if="errors && errors.length > 0"
    class="error-feedback"
  >
    <ul>
      <li
        v-for="(error, index) in errors"
        :key="index"
      >
        {{ error }}
      </li>
    </ul>
  </span>
</template>

<script lang="ts">
export default {
  props: {
    errors: {
      type: Array,
      default: (): Array<string> => [],
    }
  }
};
</script>

<style scoped lang="scss">
    .error-feedback {
        color:red;
        font-size: 10px;
        width: 100%;
    }

    ul {
        padding: 0;
        margin: 0;
        li {
            list-style: none;
        }
    }
</style>