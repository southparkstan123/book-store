<template>
  <FadeTransition>
    <div class="overlay">
      <SlideTransition>
        <div :style="{ 'background-color' : backgroundColor, width }" v-if="showMenuContent">
          <MobileMenuBody>
            <MobileMenuCloseButton 
              @closeMenu="closeMenu" 
              slot="button"
            >
              <slot name="close-button"></slot>
            </MobileMenuCloseButton>
            <div class="body" slot="body-content">
              <slot name="body-content"></slot>
            </div>
            <div class="footer" slot="footer-content">
              <slot name="footer-content"></slot>
            </div>
          </MobileMenuBody>
        </div>
      </SlideTransition>
    </div>
  </FadeTransition>
</template>

<script lang="ts">
import MobileMenuCloseButton from '@/components/menu/MobileMenuCloseButton.vue';
import MobileMenuBody from '@/components/menu/MobileMenuBody.vue';
import FadeTransition from '@/components/FadeTransition.vue';
import SlideTransition from '@/components/SlideTransition.vue';
import isValidColorValue from '@/utils/isValidColorValue';

export default {
  components: {
    MobileMenuBody,
    MobileMenuCloseButton,
    FadeTransition, 
    SlideTransition
  },
  data(): { showMenuContent: boolean } {
    return {
      showMenuContent: false
    };
  },
  methods: {
    closeMenu(): void {
      this.showMenuContent = false;
      setTimeout(() => {
        this.$emit('closeMenu');
      }, 300);
    }
  },
  props: {
    backgroundColor: {
      type: String,
      default: '#FFF',
      validator: (value: string): boolean => {
        return isValidColorValue(value) || value === '';
      }
    },
    width: {
      type: String,
      default: '100%',
    }
  },
  created(): void {
    setTimeout(() => {
      this.showMenuContent = true;
    }, 300);
  }
};
</script>

<style scoped lang="scss">
$overlay-opacity: 0.5;

.overlay {
    background-color: rgba(0,0,0,$overlay-opacity);
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 50;
}

.body{
    clear: both;
    width: 100%;
    overflow: scroll;
    min-height: 70vh;
}

</style>