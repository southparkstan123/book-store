<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="container mx-auto">
      <div v-if="!isLoading">
        <fade-transition appear>
          <div>
            <div v-if="authors.length > 0">
              <table-list>
                <router-link to="author/add" slot="add">Add Author</router-link>
                <tr slot="header">
                  <th class="w-1/6 border border-green-600">Name</th>
                  <th class="w-1/6 border border-green-600">Description</th>
                  <th class="w-1/6 border border-green-600">Created By</th>
                  <th class="w-1/6 border border-green-600">Updated By</th>
                  <th class="w-1/6 border border-green-600">Actions</th>
                </tr>
                <tr slot="body" v-for="author in authors" :key="author.id">
                  <td class="border border-green-600">{{ author.name }}</td>
                  <td class="border border-green-600">{{ author.description }}</td>
                  <td class="border border-green-600">{{ author.creator.username }}</td>
                  <td class="border border-green-600">{{ author.updater.username }}</td>
                  <td class="border border-green-600">
                    <router-link 
                      class="inline-block" 
                      :to="{ path: `/author/edit/${author.id}` }"
                    >
                      Edit
                    </router-link>
                  </td>
                </tr>
              </table-list>
            </div>
            <div v-else>
              <div class="text-center">
                <h1 class="text-2xl text-red-500">No Author</h1>
                <router-link to="author/add" slot="add">Add author</router-link>
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
import FadeTransition from '@/components/FadeTransition.vue';
import TableList from '@/components/TableList.vue';
import authorListMixin from '@/mixins/authorListMixin';

export default {
  mixins: [authorListMixin],
  components: { 
    'fade-transition': FadeTransition,
    'table-list': TableList 
  },
  watch: {
    '$route': '/authors'
  },
  created(): void {
    this.getAuthors();
  }
};
</script>

<style scoped>

</style>