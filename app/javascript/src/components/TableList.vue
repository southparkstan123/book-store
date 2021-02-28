<template>
  <div>
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

<script>
export default {};
</script>

<style scoped>
</style>