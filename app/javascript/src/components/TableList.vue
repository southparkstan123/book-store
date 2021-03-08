<template>
  <div>
    <slot name="add"></slot>
    <table class="table-auto border-separate border border-green-100">
      <thead>
        <slot name="header"></slot>
      </thead>
      <tbody>
        <slot name="body"></slot>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style scoped>
</style>