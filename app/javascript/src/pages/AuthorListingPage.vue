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
              <tr slot="body" v-for="author in authors" :key="author.id">
                <td class="border border-green-600">{{ author.name }}</td>
                <td class="border border-green-600">{{ author.description }}</td>
                <td class="border border-green-600">{{ author.creator.username }}</td>
                <td class="border border-green-600">{{ author.updater.username }}</td>
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
import { Author } from '@/type';
import { fetchAuthors } from '@/services/APIServices';
import FadeTransition from '@/components/FadeTransition.vue';
import TableList from '@/components/TableList.vue';

type AuthorState = {
  authors: Array<Author>,
  isLoading: boolean
}

export default {
  components: { 
    'fade-transition': FadeTransition,
    'table-list': TableList 
  },
  data(): AuthorState {
    return {
      authors: [],
      isLoading: false
    };
  },
  methods: {
    async getAuthors(): Promise<void> {
      try {
        this.isLoading = true;
        const result = await fetchAuthors();
        this.authors = result.data;
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted(): void {
    this.getAuthors();
  }
};
</script>

<style scoped>

</style>