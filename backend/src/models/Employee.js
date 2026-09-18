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

  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  status: {
    type: DataTypes.ENUM('ativo', 'ferias', 'inativo'),
    defaultValue: 'ativo',
  },

  data_admissao: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },

  role: {
    type: DataTypes.ENUM('colaborador', 'admin'),
    defaultValue: 'colaborador',
  },
});

module.exports = Employee;