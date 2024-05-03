const express = require('express');
const app = express();
const PORT = 3000;

let librosBiblicos = [
    { id: 1, nombre: 'Genesis', autor: 'Moises' },
    { id: 2, nombre: 'Exodo', autor: 'Moises' },
    { id: 3, nombre: 'Levitico', autor: 'Moises' },
    { id: 4, nombre: 'Juan', autor: 'Juan' },
    { id: 5, nombre: 'Juan 2', autor: 'Juan' },
];

app.use(express.json());

// Endpoint de bienvenida
app.get('/bienvenida', (req, res) => {
    res.send('Hola Soy Manuel Saca Eulate y actualmente soy Técnico en Telecomunicaciones \n Hola Soy Marco Antonio Villca Quispe y actualmente soy Técnico en Informática y computacion');
});

// Obtener libros por autor
app.get('/libros/autor/:autor', (req, res) => {
    const autor = req.params.autor;
    const librosPorAutor = librosBiblicos.filter(libro => libro.autor === autor);
    res.json(librosPorAutor);
});

// Obtener la cantidad total de libros
app.get('/libros/cantidad-total', (req, res) => {
    const cantidadTotal = librosBiblicos.length;
    res.json({ cantidadTotal: cantidadTotal });
});

// Obtener libros por nombre que contenga el texto "Juan"
app.get('/libros/nombre/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const librosConNombreJuan = librosBiblicos.filter(libro => libro.nombre.includes(nombre));
    res.json(librosConNombreJuan);
});

// Ordenar libros por nombre
app.get('/libros/ordenar-por-nombre', (req, res) => {
    const librosOrdenados = librosBiblicos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    res.json(librosOrdenados);
});

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost:" + PORT);
});
