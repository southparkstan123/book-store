import VueRouter from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import RegistrationPage from '@/pages/RegistrationPage.vue';
import MainPage from '@/pages/MainPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import BookListingPage from '@/pages/BookListingPage.vue';
import AuthorListingPage from '@/pages/AuthorListingPage.vue';
import PublisherListingPage from '@/pages/PublisherListingPage.vue';

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
    path: '/authors',
    component: AuthorListingPage,
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
