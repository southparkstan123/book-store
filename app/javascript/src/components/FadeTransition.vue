<template>
  <transition
    name="fade"
    type="animation"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
export default {};
</script>

<style scoped>
.fade-enter {
    opacity: 0;
}
.fade-enter-active {
    transition: opacity 0.3s;
}
.fade-leave {
    opacity: 0;
}
.fade-leave-active {
    transition: opacity 0.3s;
    opacity: 0;
}
</style>