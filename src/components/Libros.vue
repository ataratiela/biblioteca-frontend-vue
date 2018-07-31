<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/libros">Libros</a>
    </nav>

    <div class="container">
      <div class="row pt-5">
        <div class="col-md-7">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Editorial</th>
                <th>Páginas</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="libro of libros" :key="libro.id">
                <td>{{ libro.titulo }}</td>
                <td>{{ libro.autor }}</td>
                <td>{{ libro.editorial }}</td>
                <td>{{ libro.paginas }}</td>
                <td>{{ libro.precio }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Libros',
  data() {
    return {
      libros: [],
    };
  },
  created() {
    this.getLibros();
  },
  methods: {
    getLibros() {
      fetch('http://localhost:3000/api/libros')
        .then(res => res.json())
        .then((data) => {
          this.libros = data;
        });
    },
  },
};
</script>
