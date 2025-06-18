'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Paciente.init({
    id_paciente: { // <-- Asegúrate de que tu clave primaria se llame así
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // ... el resto de tus atributos
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
    tableName: 'Pacientes', // Asegúrate de que el nombre de la tabla sea correcto
    underscored: true // Si usas snake_case en tu DB como id_paciente, esto es útil
  });
  return Paciente;
};