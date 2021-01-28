<template>
  <svg width="50px" height="50px">
    <line x1="10" y1="15" x2="40" y2="15" :stroke="strokeColor" :stroke-width="strokeWidth" />
    <line x1="10" y1="25" x2="40" y2="25" :stroke="strokeColor" :stroke-width="strokeWidth" />
    <line x1="10" y1="35" x2="40" y2="35" :stroke="strokeColor" :stroke-width="strokeWidth" />
  </svg>
</template>

<script lang="ts">
import iconMixin from '@/mixins/icon';

export default {
  mixins: [iconMixin]
};
</script>

<style scoped>
</style>