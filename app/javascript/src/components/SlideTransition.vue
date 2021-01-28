<template>
  <transition
    name="slide"
    type="animation"
    :duration="duration"
    :appear="appear"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
import transitionMixin from '@/mixins/transition';
export default {
  mixins: [transitionMixin]
};
</script>

<style scoped>
.slide-enter {
    opacity: 0;
}
.slide-enter-active {
    animation: slide-in-Y 0.3s ease-in forwards;
    transition: opacity 0.3s;
}
.slide-leave {
    opacity: 0;
}
.slide-leave-active {
    animation: slide-out-Y 0.3s ease-out;
    transition: opacity 0.3s;
    opacity: 0;
}

@keyframes slide-in-Y {
    from {
        transform: translateY(-20px);
    }
    to {
        transform: translateY(0px);
    }
}

@keyframes slide-out-Y {
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(-20px);
    }
}

.hide {
    transform: scale(7) rotate(90deg);
    opacity: 0;
}

.slide-in {
    transition: all 0.5s;
}

.slide-out {
    transition: all 0.5s;
    opacity: 0;
}
</style>