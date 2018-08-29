<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-5">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="createPrestamo">
              <div class="dropdown">
                <select v-model="prestamo.libro" class="custom-select">
                  <option
                    v-for="libro in libros"
                    :value="libro._id"
                    :key="libro._id"
                  >
                    {{ libro.titulo }}
                  </option>
                </select>
                <select v-model="prestamo.socio" class="custom-select">
                  <option
                    v-for="socio in socios"
                    :value="socio._id"
                    :key="socio._id"
                  >
                    {{ socio.usuario }}
                  </option>
                </select>
                <select v-model="prestamo.dias" class="custom-select">
                  <option
                    v-for="n in 15"
                    :value="n"
                    :key="n"
                  >
                    {{ n }}
                  </option>
                </select>
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
              <th>Libro</th>
              <th>Socio</th>
              <th>Días</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prestamo in prestamos" :key="prestamo.id">
              <th>{{ prestamo.libro.titulo }}</th>
              <th>{{ prestamo.socio.usuario }}</th>
              <th>{{ prestamo.dias }}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
const Prestamo = (libro = null, socio = null, dias = null) => {
    libro,
    socio,
    dias
}
export default {
  name: 'Prestamos',
  data() {
    return {
      prestamo: new Prestamo(),
      libros: [],
      socios: [],
      prestamos: [],
    };
  },
  created() {
    this.getLibros();
    this.getSocios();
    this.getPrestamos();
  },
  methods: {
    getLibros() {
      fetch('http://localhost:3000/api/libros')
        .then(res => res.json())
        .then((data) => {
          this.libros = data;
        });
    },
    getSocios() {
      fetch('http://localhost:3000/api/socios')
        .then(res => res.json())
        .then((data) => {
          this.socios = data;
        });
    },
    getPrestamos() {
      fetch('http://localhost:3000/api/prestamos')
        .then(res => res.json())
        .then((data) => {
          this.prestamos = data;
        });
    },
    createPrestamo() {
      fetch('http://localhost:3000/api/prestamos', {
        method: 'POST',
        body: JSON.stringify(this.prestamo),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(() => {
          this.getPrestamos();
        });
      this.prestamo = new Prestamo();
    },
  },
};
</script>

