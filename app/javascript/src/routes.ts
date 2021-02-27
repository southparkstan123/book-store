import VueRouter from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import RegistrationPage from '@/pages/RegistrationPage.vue';
import MainPage from '@/pages/MainPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import BookListingPage from '@/pages/BookListingPage.vue';
import AuthorListingPage from '@/pages/AuthorListingPage.vue';
import PublisherListingPage from '@/pages/PublisherListingPage.vue';
<<<<<<< HEAD
import BookEditPage from '@/pages/BookEditPage.vue';
import AuthorEditPage from '@/pages/AuthorEditPage.vue';
import PublisherEditPage from '@/pages/PublisherEditPage.vue';
=======
>>>>>>> develop

export const routes = [
  { 
    path: '/',
    component: MainPage,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/books',
    component: BookListingPage,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/book/edit/:id',
    component: BookEditPage,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/book/add',
    component: BookEditPage,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/authors',
    component: AuthorListingPage,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/author/edit/:id',
    component: AuthorEditPage,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/author/add',
    component: AuthorEditPage,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/publishers',
    component: PublisherListingPage,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/publisher/edit/:id',
    component: PublisherEditPage,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/publisher/add',
    component: PublisherEditPage,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/signin',
    component: LoginPage,
    meta: {
      forVisitorOnly: true
    }
  },
  { 
    path: '/signup',
    component: RegistrationPage,
    meta: {
      forVisitorOnly: true
    }
  },
  { 
    path: '*', 
    component: NotFoundPage 
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
