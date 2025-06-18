'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    static associate(models) {
      // define association here
    }
  }
  Paciente.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    fecha_nacimiento: DataTypes.DATE,
    sexo: DataTypes.STRING,
    dni: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING,
    contacto_emergencia_nombre: DataTypes.STRING,
    contacto_emergencia_telefono: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Paciente',
    tableName: 'Pacientes',
    underscored: true
  });
  return Paciente;
};