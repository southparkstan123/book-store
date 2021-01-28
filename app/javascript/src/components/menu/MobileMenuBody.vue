<template>
  <div class="content">
    <slot name="button"></slot>
    <div class="items">
      <slot name="body-content"></slot>
    </div>
    <div class="items">
      <slot name="footer-content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style scoped lang="scss">
    .content {
        height: 100vh;
        width: 100%;
        .items {
            a {
                display: block;
                text-decoration: none;
                width: 100%;
                text-align: center;
                font-size: 1.5rem;
                margin: 0.75rem 0;
            }
        }
    }
</style>