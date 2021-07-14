<template>
  <div>
    <select v-if="authors.length > 0" :disabled="isLoading" class="block w-full mt-1" multiple @change="onChange">
      <option 
        v-for="author in authors" 
        :key="author.id" 
        :value="author.id"
        :selected="selectedItems.includes(author.id)"
      >
        {{ author.name }}
      </option>
    </select>
    <span v-else>
      <router-link to="/author/add">Add Author</router-link>
    </span>
  </div>
</template>

<script lang="ts">
import authorListMixin from '@/mixins/authorListMixin';
import selectOptionMixin from '@/mixins/selectOptionMixin';

export default {
  mixins: [authorListMixin, selectOptionMixin]
};
</script>

<style scoped>
</style>