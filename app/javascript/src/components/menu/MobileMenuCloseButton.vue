<template>
  <div class="button" @click="close">
    <slot>
      Close
    </slot>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    close(): void {
      this.$emit('closeMenu');
    }
  }
};
</script>

<style scoped>
.button {
    width: 50px;
    height: 50px;
    cursor: pointer;
    left: 398px;
    float: right;
}
</style>