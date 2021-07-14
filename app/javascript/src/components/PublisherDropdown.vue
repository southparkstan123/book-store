<template>
  <div>
    <select v-if="publishers.length > 0" :disabled="isLoading" class="block w-full mt-1" @change="onSelectItem">
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
import dropDownMixin from '@/mixins/dropDownMixin';

export default {
  mixins: [publisherListMixin, dropDownMixin]
};
</script>

<style scoped>

</style>