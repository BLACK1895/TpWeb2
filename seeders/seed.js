'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Pacientes', [
      {
        nombre: 'Juan',
        apellido: 'Perez',
        dni: '12345678',
        fecha_nacimiento: '1990-01-01',
        sexo: 'M',
        telefono: '1122334455',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Maria',
        apellido: 'Gonzalez',
        dni: '87654321',
        fecha_nacimiento: '1985-05-10',
        sexo: 'F',
        telefono: '5544332211',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Pacientes', null, {}); // Borra todos los pacientes
  }
};