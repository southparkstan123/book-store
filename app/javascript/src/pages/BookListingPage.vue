<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="container mx-auto">
      <fade-transition appear>
        <div v-if="!isLoading">
          <div>
            <div v-if="books.length > 0">
              <table-list>
                <router-link to="book/add" slot="add">Add Book</router-link>
                <tr slot="header">
                  <th class="w-1/6 border border-green-600">Name</th>
                  <th class="w-1/8 border border-green-600">Price</th>
                  <th class="w-1/2 border border-green-600">Abstract</th>
                  <th class="w-1/6 border border-green-600">Authors</th>
                  <th class="w-1/8 border border-green-600">Updated By</th>
                  <th class="w-1/4 border border-green-600">Actions</th>
                </tr>
                <tr slot="body" v-for="book in books" :key="book.id">
                  <td class="border border-green-600">{{ book.name }}</td>
                  <td class="border border-green-600">{{ book.price }}</td>
                  <td class="border border-green-600">{{ book.abstract }}</td>
                  <td class="border border-green-600" >{{ book.authors | displayAuthors }}</td>
                  <td class="border border-green-600">{{ book.updater.username }}</td>
                  <td class="border border-green-600">
                    <router-link 
                      class="inline-block" 
                      :to="{ path: `/book/edit/${book.id}` }"
                    >
                      Edit
                    </router-link>
                  </td>
                </tr>
              </table-list>
            </div>
            <div v-else>
              <div class="text-center">
                <h1 class="text-2xl text-red-500">No Books</h1>
                <router-link to="book/add" slot="add">Add Book</router-link>
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
import { Author, Book } from '@/type';
import { fetchRecords } from '@/services/CRUDServices';
import FadeTransition from '@/components/FadeTransition.vue';
import TableList from '@/components/TableList.vue';
import { mapActions } from 'vuex';
import { NavigationGuardNext } from 'vue-router';
import errorHandleMixin from '@/mixins/errorHandleMixin';

type BookState = {
  books: Array<Book>,
  isLoading: boolean
}

export default {
  mixins: [errorHandleMixin],
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
    ...mapActions({
      openModal: 'modal/openModal'
    })
  },
  beforeRouteEnter (to: any, from: any, next: NavigationGuardNext): void {
    fetchRecords('book').then(result => {
      next((vm: any) => vm.books = result.data);
    }).catch(error => {
      this.onHandleError(error);
    });
  },
  beforeRouteUpdate (to: any, from: any, next: NavigationGuardNext): void {
    this.isLoading = true;
    fetchRecords('book').then(result => {
      this.books = result.data;
      next();
    }).catch(error => {
      this.onHandleError(error);
    });
  },
  filters: {
    displayAuthors(authorList: Array<Author>): string {
      if(authorList.length > 2){
        const firstTwoAuthorNames = authorList
          .filter((author: Author, index: number) => index < 2)
          .map((author: Author) => author.name);
        const num: number = authorList.length - 2;
        return firstTwoAuthorNames.join(', ') + ` + ${num.toString()} ${(num > 1) ? 'authors' : 'author'}`;
      } else if (authorList.length === 2) {
        return authorList.map((author: Author) => author.name).join(', ');
      } else if (authorList.length === 1) {
        return authorList[0].name;
      } else {
        return 'No author';
      }
    }
  }
};
</script>

<style scoped>

</style>