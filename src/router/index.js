import Vue from 'vue';
import VueRouter from 'vue-router';
import Libros from '@/components/Libros';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/api/libros',
      name: 'Libros',
      component: Libros,
    },
  ],
});

export default router;
