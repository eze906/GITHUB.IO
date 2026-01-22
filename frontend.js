const express = require('express');
const path = require('path');

const app = express();

// 👉 servir archivos estáticos desde la carpeta raíz
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(5500, () => {
  console.log('Frontend corriendo en http://localhost:5500');
});













