const db = require('../models'); 
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
    await db.Paciente.create({ 
      nombre,
      apellido,
      fecha_nacimiento,
      sexo,
      dni,
      telefono,
      direccion,
      contacto_emergencia_nombre,
      contacto_emergencia_telefono
    });
    res.redirect('/pacientes');
  } catch (error) {
    console.error('Error al registrar nuevo paciente:', error);
    
    res.status(500).send('Error interno al registrar paciente. Inténtelo de nuevo.');
  }
};

exports.getAllPacientes = async (req, res) => {
  try {
    const pacientes = await db.Paciente.findAll(); 
    res.render('pacientes/index', { title: 'Listado de Pacientes', pacientes: pacientes });
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).send('Error interno al obtener el listado de pacientes.');
  }
};

exports.renderEditPacienteForm = async (req, res) => {
  const pacienteId = parseInt(req.params.id, 10); 

  if (isNaN(pacienteId)) {
    console.error('ID de paciente no válido recibido para edición:', req.params.id);
    return res.status(400).send('ID de paciente no válido.');
  }

  try {
    const paciente = await db.Paciente.findByPk(pacienteId); 

    if (!paciente) {
      console.warn('Paciente no encontrado para edición con ID:', pacienteId);
      return res.status(404).send('Paciente no encontrado.');
    }

    
    const formattedFechaNacimiento = paciente.fecha_nacimiento ? paciente.fecha_nacimiento.toISOString().split('T')[0] : '';

    res.render('pacientes/edit', { title: 'Editar Paciente', paciente: paciente.toJSON(), formattedFechaNacimiento });
  } catch (error) {
    console.error('Error al obtener paciente para edición:', error);
    res.status(500).send('Error interno al cargar el formulario de edición.');
  }
};

exports.updatePaciente = async (req, res) => {
  const pacienteId = parseInt(req.params.id, 10); 

  
  if (isNaN(pacienteId)) {
    console.error('ID de paciente no válido recibido para actualización:', req.params.id);
    return res.status(400).send('ID de paciente no válido.');
  }

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
    const [updatedRows] = await db.Paciente.update({ 
      nombre,
      apellido,
      fecha_nacimiento,
      sexo,
      dni,
      telefono,
      direccion,
      contacto_emergencia_nombre,
      contacto_emergencia_telefono
    }, {
      where: { id: pacienteId }
    });

    if (updatedRows > 0) {
      res.redirect('/pacientes');
    } else {
      
      console.warn('Paciente no encontrado para actualizar o no se realizaron cambios con ID:', pacienteId);
      res.status(404).send('Paciente no encontrado para actualizar o no se realizaron cambios.');
    }
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    res.status(500).send('Algo salió mal al actualizar el paciente.');
  }
};

exports.deletePaciente = async (req, res) => {
  const pacienteId = parseInt(req.params.id, 10);

  
  if (isNaN(pacienteId)) {
    console.error('ID de paciente no válido recibido para eliminación:', req.params.id);
    return res.status(400).json({ message: 'ID de paciente no válido.' });
  }

  try {
    const deletedRows = await db.Paciente.destroy({ 
      where: { id: pacienteId }
    });

    if (deletedRows > 0) {
      res.status(200).json({ message: 'Paciente eliminado con éxito', id: pacienteId });
    } else {
      console.warn('Paciente no encontrado para eliminar con ID:', pacienteId);
      res.status(404).json({ message: 'Paciente no encontrado para eliminar.' });
    }
  } catch (error) {
    console.error('Error al eliminar paciente:', error);
    res.status(500).json({ message: 'Error al eliminar el paciente', error: error.message });
  }
};