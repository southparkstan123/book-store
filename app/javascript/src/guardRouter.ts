const guardedRouter: void = (router: VueRouter, store: Store) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters['user/isAuthenticated']) {
        next({ path: '/signin' });
      } else {
        next();
      }
    }
    else if (to.matched.some(record => record.meta.forVisitorOnly)) {
      if (!store.getters['user/isAuthenticated']) {
        next();
      } else {
        next({ path: '/' });
      }
    } else {
      next();
    }
  });
};

export default guardedRouter;