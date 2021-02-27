<template>
  <div>
    <DesktopMenu 
      v-if="!isMobileView" 
      :backgroundColor="backgroundColor"
    >
      <template slot="brand">
        <slot name="brand"></slot>
      </template>
      <template slot="body-content">
        <slot name="body-content"></slot>
      </template>
      <template slot="footer-content">
        <slot name="footer-content"></slot>
      </template>
    </DesktopMenu>
    <MobileMenu
      v-if="isMenuOpen && isMobileView"
      :isMenuOpen="isMenuOpen"
      @closeMenu="closeMenu"
      :backgroundColor="backgroundColor"
      :width="mobileMenuWidth"
    >
      <template slot="body-content">
        <slot name="body-content"></slot>
      </template>
      <template slot="footer-content">
        <slot name="footer-content"></slot>
      </template>
      <template slot="close-button">
        <slot name="close-button"></slot>
      </template>
    </MobileMenu>
    <MobileMenuBurgerButton v-if="!isMenuOpen && isMobileView" @openMenu="openMenu">
      <slot name="open-button"></slot>
    </MobileMenuBurgerButton>
  </div>
</template>

<script lang="ts">

import MobileMenu from './MobileMenu.vue';
import MobileMenuBurgerButton from './MobileMenuBurgerButton.vue';
import DesktopMenu from './DesktopMenu.vue';
import isValidColorValue from '../../utils/isValidColorValue';

export default {
  name: 'my-vue-nav-bar',
  components: {
    MobileMenu,
    MobileMenuBurgerButton,
    DesktopMenu
  },
  props: {
    backgroundColor: {
      type: String,
      default: '#FFF',
      validator: (value: string): boolean => {
        return isValidColorValue(value) || value === '';
      }
    },
    breakpoint: {
      type: Number,
      default: 1024
    },
    currentHash: {
      type: String,
      required: false
    }
  },
  data(): {isMenuOpen: boolean, windowWidth: string | number } {
    return {
      isMenuOpen: false,
      windowWidth: 0
    };
  },
  watch: {
    windowWidth(newWidth: number): void {
      if (newWidth > this.breakpoint && this.isMenuOpen) {
        this.closeMenu();
      }
    }
  },
  methods: {
    closeMenu(): void {
      this.isMenuOpen = false;
      this.$emit('bodyScrollLock', this.isMenuOpen);
    },
    openMenu(): void {
      this.isMenuOpen = true;
      this.$emit('bodyScrollLock', this.isMenuOpen);
    },
    onResize(): void {
      this.windowWidth = self.innerWidth;
      this.$emit('onChangeWindowWidth', this.windowWidth);
    }
  },
  computed: {
    isMobileView(): boolean {
      return this.windowWidth < this.breakpoint;
    },
    mobileMenuWidth(): string {
      return this.windowWidth + 'px';
    }
  },
  mounted(): void {
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
  beforeDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }
};
</script>

<style scoped>
</style>