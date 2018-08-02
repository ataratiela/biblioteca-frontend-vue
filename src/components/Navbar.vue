<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" v-for="routes in links" :key="routes.id"
      :to="`${routes.page}`">{{routes.text}}</router-link>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Libros',
          page:'/api/libros'
        },
        {
          id: 1,
          text: 'Socios',
          page:'/api/socios'
        },
        {
          id: 2,
          text: 'Prestamos',
          page:'/api/prestamos'
        },
      ],
    };
  },
};
</script>
