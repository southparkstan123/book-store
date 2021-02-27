<template>
    <nav
        :style="{'background-color': backgroundColor}"
    >
        <div class="body">
            <div class="brand">
                <slot name="brand"></slot>
            </div>
            <slot name="body-content"></slot>
        </div>
        <div class="footer">
            <slot name="footer-content"></slot>
        </div>
    </nav>
</template>

<script lang="ts">
import isValidColorValue from '@/utils/isValidColorValue';

export default {
  props: {
    backgroundColor: {
      type: String,
      default: '#FFF',
      validator: (value: string): boolean => {
        return isValidColorValue(value) || value === '';
      }
    }
  }
};
</script>

<style scoped lang="scss">
nav {
    position: fixed;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.75rem 0;
    position: fixed;
    width: 100%;
    z-index: 50;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: flex;

    div {
        &.body > * {
            margin-left: 0.5rem;
            margin-right: 0.5rem;
            text-decoration: none;
        }

        &.items > .brand {
            display: inline;
        }
    }
}
</style>