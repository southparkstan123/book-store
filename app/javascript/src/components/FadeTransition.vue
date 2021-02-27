<template>
  <transition
    name="fade"
    type="animation"
    :duration="duration"
    :appear="appear"
  >
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import transitionMixin from '@/mixins/transition';
export default {
  mixins: [transitionMixin]
};
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