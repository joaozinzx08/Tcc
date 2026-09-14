const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
  matricula: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  setor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('colaborador', 'admin'),
    defaultValue: 'colaborador',
  },
});

module.exports = Employee;