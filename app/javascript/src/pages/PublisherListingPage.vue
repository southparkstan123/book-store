<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="container mx-auto">
      <fade-transition appear>
        <div v-if="!isLoading">
          <div>
            <div v-if="publishers.length > 0">
              <table-list>
                <router-link to="publisher/add" slot="add">Add Publisher</router-link>
                <tr slot="header">
                  <th class="w-1/6 border border-green-600">Name</th>
                  <th class="w-1/6 border border-green-600">Description</th>
                  <th class="w-1/6 border border-green-600">Created By</th>
                  <th class="w-1/6 border border-green-600">Updated By</th>
                  <th class="w-1/6 border border-green-600">Actions</th>
                </tr>
                <tr slot="body" v-for="publisher in publishers" :key="publisher.id">
                  <td class="border border-green-600">{{ publisher.name }}</td>
                  <td class="border border-green-600">{{ publisher.description }}</td>
                  <td class="border border-green-600">{{ publisher.creator.username }}</td>
                  <td class="border border-green-600">{{ publisher.updater.username }}</td>
                  <td class="border border-green-600">
                    <router-link 
                      class="inline-block" 
                      :to="{ path: `/publisher/edit/${publisher.id}` }"
                    >
                      Edit
                    </router-link>
                  </td>
                </tr>
              </table-list>
            </div>
            <div v-else>
              <div class="text-center">
                <h1 class="text-2xl text-red-500">No Publisher</h1>
                <router-link to="publisher/add" slot="add">Add Publisher</router-link>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h1 class="text-center text-2xl text-red-500">Loading...</h1>
        </div>
      </fade-transition>
    </div>
  </div>
</template>

<script lang="ts">
import FadeTransition from '@/components/FadeTransition.vue';
import TableList from '@/components/TableList.vue';
import publisherListMixin from '@/mixins/publisherListMixin';

export default {
  mixins: [publisherListMixin],
  components: { 
    'fade-transition': FadeTransition,
    'table-list': TableList 
  },
  watch: {
    '$route': '/publishers'
  },
  created(): void {
    this.getPublishers();
  }
};
</script>

<style scoped>

</style>