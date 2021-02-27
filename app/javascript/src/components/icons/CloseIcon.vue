<template>
  <svg width="50px" height="50px">
    <line 
      x1="10"
      y1="40"
      x2="40"
      y2="10"
      :stroke="strokeColor"
      :stroke-width="strokeWidth"
    />
    <line
      x1="10"
      y1="10"
      x2="40"
      y2="40"
      :stroke="strokeColor"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>

<script lang="ts">
import iconMixin from '@/mixins/icon';
export default {
  mixins: [iconMixin],
};
</script>

<style scoped>
</style>