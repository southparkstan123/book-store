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
export default {
  mixins: [authorListMixin],
  props: {
    selectedItems: {
      type: Array
    },
  },
  methods: {
    onChange(event: any): void {
      let ids: Array<number> = [];
      const options: any = event.target.options;

      for (let index = 0; index < options.length; index++) {
        if(options[index].selected === true){
          ids.push(parseInt(options[index].value, 10));
        } 
      }
      this.$emit('selectedAuthors', ids);
    },
  },
};
</script>

<style scoped>
</style>