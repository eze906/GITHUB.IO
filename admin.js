const API = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

if (!token) {
  alert('No autorizado');
  location.href = 'login.html';
}

// ================= CARGAR ALUMNOS =================
async function cargarAlumnos() {
  const res = await fetch(`${API}/alumnos`, {
    headers: { Authorization: token }
  });

  const alumnos = await res.json();
  const tbody = document.getElementById('tablaAlumnos');
  tbody.innerHTML = '';

  alumnos.forEach(a => {
    tbody.innerHTML += `
      <tr>
        <td>${a.Nombre}</td>
        <td>${a.Actividad || ''}</td>
        <td>${a.Dojo || ''}</td>
        <td>${a.Horario || ''}</td>
        <td>${a.Categoria || ''}</td>
        <td>${a.Cinturon || ''}</td>
        <td class="actions">
          <button class="btn btn-primary" onclick='editar(${JSON.stringify(a)})'>✏️</button>
          <button class="btn btn-danger" onclick="eliminar(${a.Id})">🗑</button>
        </td>
      </tr>
    `;
  });
}

// ================= GUARDAR =================
document.getElementById('alumnoForm').addEventListener('submit', async e => {
  e.preventDefault();

  const data = {
    usuario: usuario.value,
    nombre: nombre.value,
    actividad: actividad.value,
    dojo: dojo.value,
    horario: horario.value,
    categoria: categoria.value,
    cinturon: cinturon.value
  };

  const id = alumnoId.value;
  const url = id ? `${API}/alumnos/${id}` : `${API}/alumnos`;
  const method = id ? 'PUT' : 'POST';

  await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(data)
  });

  alumnoForm.reset();
  alumnoId.value = '';
  cargarAlumnos();
});

// ================= EDITAR =================
function editar(a) {
  alumnoId.value = a.Id;
  usuario.value = a.Usuario;
  nombre.value = a.Nombre;
  actividad.value = a.Actividad || '';
  dojo.value = a.Dojo || '';
  horario.value = a.Horario || '';
  categoria.value = a.Categoria || '';
  cinturon.value = a.Cinturon || '';
}

// ================= ELIMINAR =================
async function eliminar(id) {
  if (!confirm('¿Eliminar alumno?')) return;

  await fetch(`${API}/alumnos/${id}`, {
    method: 'DELETE',
    headers: { Authorization: token }
  });

  cargarAlumnos();
}

cargarAlumnos();






