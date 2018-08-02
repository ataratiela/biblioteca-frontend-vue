<template>
  <div class="container">
    <div class="row pt-5">
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
              </tr>
            </tbody>
          </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Socios',
  data() {
    return {
      socios: [],
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
  },
};
</script>
