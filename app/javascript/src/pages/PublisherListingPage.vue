<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="container mx-auto">
      <div v-if="!isLoading">
        <fade-transition appear>
          <div>
            <table-list>
              <tr slot="header">
                <th class="w-1/6 border border-green-600">Name</th>
                <th class="w-1/6 border border-green-600">Description</th>
                <th class="w-1/6 border border-green-600">Created By</th>
                <th class="w-1/6 border border-green-600">Updated By</th>
              </tr>
              <tr slot="body" v-for="publisher in publishers" :key="publisher.id">
                <td class="border border-green-600">{{ publisher.name }}</td>
                <td class="border border-green-600">{{ publisher.description }}</td>
                <td class="border border-green-600">{{ publisher.creator.username }}</td>
                <td class="border border-green-600">{{ publisher.updater.username }}</td>
              </tr>
            </table-list>
          </div>
        </fade-transition>
      </div>
      <div v-else>
        <fade-transition appear>
          <h1 class="text-center text-2xl text-red-500">Loading...</h1>
        </fade-transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Publisher } from '@/type';
import { fetchPublishers } from '@/services/APIServices';
import FadeTransition from '@/components/FadeTransition.vue';
import TableList from '@/components/TableList.vue';

type AuthorState = {
  publishers: Array<Publisher>,
  isLoading: boolean
}

export default {
  components: { 
    'fade-transition': FadeTransition,
    'table-list': TableList 
  },
  data(): AuthorState {
    return {
      publishers: [],
      isLoading: false
    };
  },
  methods: {
    async getPublishers(): Promise<void> {
      try {
        this.isLoading = true;
        const result = await fetchPublishers();
        this.publishers = result.data;
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted(): void {
    this.getPublishers();
  }
};
</script>

<style scoped>

</style>