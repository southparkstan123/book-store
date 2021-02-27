<template>
  <div>
    <select v-if="publishers.length > 0" :disabled="isLoading" class="block w-full mt-1" @change="onSelectPublisher">
      <option selected="selected" disabled>Please select the publisher</option>
      <option 
        v-for="publisher in publishers" 
        :key="publisher.id" 
        :value="publisher.id"
        :selected="selectedItem === publisher.id"
      >
        {{ publisher.name }}
      </option>
    </select>
    <span v-else>
      <router-link to="/publisher/add">Add Publishser</router-link>
    </span>
  </div>
</template>

<script lang="ts">
import publisherListMixin from '@/mixins/publisherListMixin';
export default {
  mixins: [publisherListMixin],
  props: {
    selectedItem: {
      type: Number
    },
  },
  methods: {
    onSelectPublisher(event: { target: { value: string }}): void {
      this.$emit('selectPublisher', parseInt(event.target.value, 10));
    },
  },
};
</script>

<style scoped>

</style>