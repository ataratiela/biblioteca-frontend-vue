<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-5">
        <div class="card">
          <div class="card-body">
            <form @submit="enviarLibro">
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
              <template v-if="editar === false">
                <button class="btn btn-primary btn-block">Crear</button>
              </template>
              <template v-else>
                <button class="btn btn-primary btn-block">Actualizar</button>
              </template>
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
                <button @click="editLibro(libro._id)" class="btn btn-secondary">
                  Editar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
      editar: false,
      libroEditar: '',
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
    enviarLibro() {
      if (this.editar === false) {
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
      } else {
        fetch(`http://localhost:3000/api/libros/${this.libroEditar}`, {
          method: 'PUT',
          body: JSON.stringify(this.libro),
          headers: {
            'Content-type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(() => {
            this.getLibros();
            this.editar = false;
          });
      }
      this.libro = new Libro();
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
    editLibro(id) {
      fetch(`http://localhost:3000/api/libros/${id}`)
        .then(res => res.json())
        .then((data) => {
          this.libro = new Libro(data.titulo, data.autor,
            data.editorial, data.paginas, data.precio);
          this.libroEditar = data._id;
          this.editar = true;
        });
    },
  },
};
</script>
