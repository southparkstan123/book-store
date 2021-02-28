<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="container mx-auto">
      <div v-if="!isLoading">
        <fade-transition appear>
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
import { fetchRecords } from '@/services/CRUDServices';
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
        const result = await fetchRecords('publisher');
        this.publishers = result.data;
      } catch (error) {
        this.onHadleError(error);
      } finally {
        this.isLoading = false;
      }
    },
    onHandleError(error: any): void {
      const { status }  = error.response;
      const { message } = error.response.data;

      this.openModal({
        type: 'alert',
        message,
        title: `${status} Error`,
      });
    }
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