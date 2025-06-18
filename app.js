require('dotenv').config();

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const db = require('./models');

const pacientesRoutes = require('./routes/pacientesRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Bienvenido al HIS', isHomePage: true });
});

app.use('/pacientes', pacientesRoutes);

app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal en el servidor!');
});

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('Base de datos sincronizada correctamente.');
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al sincronizar o conectar con la base de datos:', err);
    });