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
    id_paciente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

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