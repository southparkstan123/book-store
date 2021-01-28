<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="container mx-auto">
      <div v-if="!isLoading">
        <fade-transition appear>
          <div>
            <table-list>
              <tr slot="header">
                <th class="w-1/6 border border-green-600">Name</th>
                <th class="w-1/6 border border-green-600">Price</th>
                <th class="w-1/5 border border-green-600">Abstract</th>
                <th class="w-1/5 border border-green-600">Authors</th>
                <th class="w-1/6 border border-green-600">Created By</th>
                <th class="w-1/6 border border-green-600">Updated By</th>
              </tr>
              <tr slot="body" v-for="book in books" :key="book.id">
                <td class="border border-green-600">{{ book.name }}</td>
                <td class="border border-green-600">{{ book.price }}</td>
                <td class="border border-green-600">{{ book.abstract }}</td>
                <td class="border border-green-600" >{{ book.authors | displayAuthors }}</td>
                <td class="border border-green-600">{{ book.creator.username }}</td>
                <td class="border border-green-600">{{ book.updater.username }}</td>
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
import { Author, Book } from '@/type';
import { fetchBooks } from '@/services/APIServices';
import FadeTransition from '@/components/FadeTransition.vue';
import TableList from '@/components/TableList.vue';

type BookState = {
  books: Array<Book>,
  isLoading: boolean
}

export default {
  components: { 
    'fade-transition': FadeTransition,
    'table-list': TableList 
  },
  data(): BookState {
    return {
      books: [],
      isLoading: false
    };
  },
  methods: {
    async getBooks(): Promise<void> {
      try {
        this.isLoading = true;
        const result = await fetchBooks();
        this.books = result.data;
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted(): void {
    this.getBooks();
  },
  filters: {
    displayAuthors(authorList: Array<Author>): string {
      return authorList.map(author => author.name).join(', ');
    }
  }
};
</script>

<style scoped>

</style>