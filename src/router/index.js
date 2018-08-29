import Vue from 'vue';
import VueRouter from 'vue-router';
import Libros from '@/components/Libros';
import Socios from '@/components/Socios';
import Prestamos from '@/components/Prestamos';

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
    {
      path: '/api/prestamos',
      name: 'Prestamos',
      component: Prestamos,
    },
  ],
});

export default router;
