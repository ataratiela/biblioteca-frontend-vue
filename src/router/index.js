import Vue from 'vue';
import VueRouter from 'vue-router';
import Libros from '@/components/Libros';
import Socios from '@/components/Socios';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/api/libros',
      name: 'Libros',
      component: Libros,
    },
    {
      path: '/api/socios',
      name: 'Socios',
      component: Socios,
    },
  ],
});

export default router;
