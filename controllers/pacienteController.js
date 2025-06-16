const db = require('../config/db');
exports.renderNewPacienteForm = (req, res) => {
  res.render('pacientes/new', { title: 'Registrar Nuevo Paciente' });
};


exports.createPaciente = async (req, res) => {
  const {
    nombre,
    apellido,
    fecha_nacimiento,
    sexo,
    dni,
    telefono,
    direccion,
    contacto_emergencia_nombre,
    contacto_emergencia_telefono 
  } = req.body;

  try {
    const query = `
      INSERT INTO pacientes (
        nombre, apellido, fecha_nacimiento, sexo, dni,
        telefono, direccion, contacto_emergencia_nombre, contacto_emergencia_telefono
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      nombre, apellido, fecha_nacimiento, sexo, dni,
      telefono, direccion, contacto_emergencia_nombre, contacto_emergencia_telefono
    ];

    await db.query(query, values);
    res.redirect('/pacientes');
  } catch (error) {
    console.error('Error al registrar nuevo paciente:', error);
    res.status(500).send('Error interno al registrar paciente. Inténtelo de nuevo.');
  }
};


exports.getAllPacientes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pacientes');
    const pacientes = rows;
    res.render('pacientes/index', { title: 'Listado de Pacientes', pacientes: pacientes });
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).send('Error interno al obtener el listado de pacientes.');
  }
};