<template>
  <div>
    <button>Add</button>
    <table class="table-auto border-separate border border-green-100">
      <thead>
        <slot name="header"></slot>
        <!-- <th class="w-1/3 border border-green-600">Actions</th> -->
      </thead>
      <tbody>
        <slot name="body"></slot>
        <!-- <td class="border border-green-600">
          <button class="bg-blue-200">
            Edit
          </button>
          <button class="bg-red-200">
            Delete
          </button>
        </td> -->
      </tbody>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>