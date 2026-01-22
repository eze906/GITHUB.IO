// ===============================
// PROTECCIÓN: debe estar logueado
// ===============================
const token = localStorage.getItem('token');

if (!token) {
  alert('No estás logueado');
  location.href = 'login.html';
}

// ===============================
// CARGAR FICHA DEL ALUMNO
// ===============================
fetch('/api/alumnos/me', {
  headers: {
    Authorization: token
  }
})
  .then(r => {
    if (!r.ok) throw new Error('No se pudo cargar la ficha');
    return r.json();
  })
  .then(alumno => {
    cargarFichaAlumno(alumno);
  })
  .catch(err => {
    console.error(err);
    alert('Error al cargar ficha del alumno');
  });

// ===============================
// MOSTRAR DATOS EN PANTALLA
// ===============================
function cargarFichaAlumno(a) {
  document.getElementById('nombre').textContent = a.Nombre || '';
  document.getElementById('actividad').textContent = a.Actividad || '';
  document.getElementById('dojo').textContent = a.Dojo || '';
  document.getElementById('horario').textContent = a.Horario || '';
  document.getElementById('categoria').textContent = a.Categoria || '';
  document.getElementById('cinturon').textContent = a.Cinturon || '';

  // 🔴 Instrucciones ES STRING
  document.getElementById('instrucciones').textContent =
    a.Instrucciones || 'Sin instrucciones';

  // ===============================
  // FOTO (si existe)
  // ===============================
  if (a.Foto) {
    document.getElementById('foto').src = `/imagenes/alumnos/${a.Foto}`;
  }

  // ===============================
  // MATERIAL PDF (si existe)
  // ===============================
  if (a.MaterialPDF) {
    const link = document.getElementById('material');
    link.href = `/material/${a.MaterialPDF}`;
    link.textContent = 'Descargar material';
    link.style.display = 'inline';
  }
}

// ===============================
// LOGOUT
// ===============================
function logout() {
  localStorage.removeItem('token');
  location.href = 'login.html';
}






