<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/libros">Libros</a>
    </nav>

    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit="createLibro">
                <div class="form-group">
                  <input
                  v-model="libro.titulo"
                  placeholder="Título"
                  type="text"
                  class="form-control"
                  >
                </div>
                <div class="form-group">
                  <input
                  v-model="libro.autor"
                  placeholder="Autor"
                  type="text"
                  class="form-control">
                </div>
                <div class="form-group">
                  <input
                  v-model="libro.editorial"
                  placeholder="Editorial"
                  type="text"
                  class="form-control">
                </div>
                <div class="form-group">
                  <input
                  v-model="libro.paginas"
                  placeholder="Páginas"
                  type="text"
                  class="form-control">
                </div>
                <div class="form-group">
                  <input
                  v-model="libro.precio"
                  placeholder="Precio"
                  type="text"
                  class="form-control">
                </div>
                <button class="btn btn-primary btn-block">Crear</button>
              </form>
            </div>
          </div>
        </div>
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
                <td>
                  <button @click="deleteLibro(libro._id)" class="btn btn-danger">
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class Libro {
  constructor(titulo, autor, editorial, paginas, precio) {
    this.titulo = titulo;
    this.autor = autor;
    this.editorial = editorial;
    this.paginas = paginas;
    this.precio = precio;
  }
}

export default {
  name: 'Libros',
  data() {
    return {
      libro: new Libro(),
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
    createLibro() {
      fetch('http://localhost:3000/api/libros', {
        method: 'POST',
        body: JSON.stringify(this.libro),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(() => {
          this.getLibros();
        });
    },
    deleteLibro(id) {
      fetch(`http://localhost:3000/api/libros/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(() => {
          this.getLibros();
        });
    },
  },
};
</script>
