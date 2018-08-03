<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-5">
        <div class="card">
          <div class="card-body">
            <form @submit="enviarSocio">
              <div class="form-group">
                <input
                v-model="socio.usuario"
                placeholder="Usuario"
                type="text"
                class="form-control"
                >
              </div>
              <div class="form-group">
                <input
                v-model="socio.clave"
                placeholder="Contraseña"
                type="text"
                class="form-control">
              </div>
              <div class="form-group">
                <input
                v-model="socio.nombre"
                placeholder="Nombre"
                type="text"
                class="form-control">
              </div>
              <div class="form-group">
                <input
                v-model="socio.apellidos"
                placeholder="Apellido"
                type="text"
                class="form-control">
              </div>
              <div class="form-group">
                <input
                v-model="socio.direccion"
                placeholder="Dirección"
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
                <th>Usuario</th>
                <th>Contraseña</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Dirección</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="socio of socios" :key="socio.id">
                <td>{{ socio.usuario }}</td>
                <td>{{ socio.clave }}</td>
                <td>{{ socio.nombre }}</td>
                <td>{{ socio.apellidos }}</td>
                <td>{{ socio.direccion }}</td>
                <td>
                  <button @click="deleteSocio(socio._id)" class="btn btn-danger">
                    Eliminar
                </button>
                <button @click="editSocio(socio._id)" class="btn btn-secondary">
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
class Socio {
  constructor(usuario, clave, nombre, apellidos, direccion) {
    this.usuario = usuario;
    this.clave = clave;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.direccion = direccion;
  }
}
export default {
  name: 'Socios',
  data() {
    return {
      socio: new Socio(),
      socios: [],
      editar: false,
      socioEditar: '',
    };
  },
  created() {
    this.getSocios();
  },
  methods: {
    getSocios() {
      fetch('http://localhost:3000/api/socios')
        .then(res => res.json())
        .then((data) => {
          this.socios = data;
        });
    },
    enviarSocio() {
      if (this.editar === false) {
        fetch('http://localhost:3000/api/socios', {
          method: 'POST',
          body: JSON.stringify(this.socio),
          headers: {
            'Content-type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(() => {
            this.getSocios();
          });
      } else {
        fetch(`http://localhost:3000/api/socios/${this.socioEditar}`, {
          method: 'PUT',
          body: JSON.stringify(this.socio),
          headers: {
            'Content-type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(() => {
            this.getSocios();
            this.editar = false;
          });
      }
      this.socio = new Socio();
    },
    deleteSocio(id) {
      fetch(`http://localhost:3000/api/socios/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(() => {
          this.getSocios();
        });
    },
    editSocio(id) {
      fetch(`http://localhost:3000/api/socios/${id}`)
        .then(res => res.json())
        .then((data) => {
          this.socio = new Socio(data.usuario, data.clave,
            data.nombre, data.apellidos, data.direccion);
          this.socioEditar = data._id;
          this.editar = true;
        });
    },
  },
};
</script>
