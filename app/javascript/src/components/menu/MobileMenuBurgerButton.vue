<template>
  <div class="button" @click="open">
    <slot>
      Open
    </slot>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    open(): void {
      this.$emit('openMenu');
    },
  }
};
</script>

<style scoped>
.button {
    position: fixed;
    cursor: pointer;
    z-index: 10;
}
</style>