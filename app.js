require('dotenv').config();
const express = require('express');
const pacientesRoutes = require('./routes/pacientesRoutes');
const path = require('path');
const db = require('./models'); 
const methodOverride = require('method-override');
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


app.use('/pacientes', pacientesRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: 'Bienvenido al HIS', isHomePage: true });
});

app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});