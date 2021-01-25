<template>
  <div
    id="page-not-found"
    class="min-h-screen flex items-center justify-center"
  >
    <h1 class="text-red-900">
      Oops! Page not found!
    </h1>
    <button @click="onPreviousPage">
      Previous page
    </button>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    onPreviousPage(): void {
      this.$router.back();
    }
  }
};
</script>

<style scoped>

</style>