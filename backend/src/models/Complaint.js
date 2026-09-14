const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Complaint = sequelize.define('Complaint', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  setor_relacionado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'em_analise', 'respondida', 'resolvida', 'nao_resolvida'),
    defaultValue: 'pendente',
  },
  anonima: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  protocolo: {
    type: DataTypes.STRING,
    unique: true,
  },
});

module.exports = Complaint;