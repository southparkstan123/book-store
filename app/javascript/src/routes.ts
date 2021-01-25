import VueRouter from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import RegistrationPage from '@/pages/RegistrationPage.vue';
import MainPage from '@/pages/MainPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

export const routes = [
  { 
    path: '/',
    component: MainPage,
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
