import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/books',
      name: 'books',
      component: () =>
        import(/* webpackChunkName: "books" */ './views/Books.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () =>
        import(/* webpackChunkName: "users" */ './views/Users.vue'),
      beforeEnter: (to, from, next) => {
        if (!store.getters.loggedIn) {
          next(false);
        } else {
          next();
        }
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import(/* webpackChunkName: "register" */ './views/Register.vue'),
    },
  ],
});
