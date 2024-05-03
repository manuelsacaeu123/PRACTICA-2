const express = require('express');
const app = express();
const PORT = 3000; //Como se indico en clase es el puerto donde se puede acceder a la aplicacion y puede ser variante

//array
let librosBiblicos = [
    { id: 1, nombre: 'Genesis', autor: 'Moises' },
    { id: 2, nombre: 'Exodo', autor: 'Moises' },
    { id: 3, nombre: 'Levitico', autor: 'Moises' },
    { id: 4, nombre: 'Deuteronomio', autor: 'Moises' },
    { id: 5, nombre: 'Numeros', autor: 'Moises' },
    { id: 6, nombre: 'Juan', autor: 'Juan' },
    { id: 7, nombre: 'Juan 2', autor: 'Juan' },
    { id: 8, nombre: 'Juan 3', autor: 'Juan'},
    { id: 9, nombre: 'Judas', autor: 'Judas'},
    { id: 10, nombre: 'Apocalipsis', autor: 'Juan'}
];
//manejo de json
app.use(express.json());

// Endpoint de bienvenida
app.get('/bienvenida', (req, res) => {
    res.send('Hola Soy Manuel Saca Eulate y actualmente soy Técnico en Telecomunicaciones \n Hola Soy Marco Antonio Villca Quispe y actualmente soy Técnico en Informática y computacion');
});
//endpoint para obtener todos los libros
app.get('/libros', (req, res) =>{
    res.json(librosBiblicos);
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
