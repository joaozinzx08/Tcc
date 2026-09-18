const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Feedback = sequelize.define('Feedback', {
  tipo: {
    type: DataTypes.ENUM('avaliacao_reclamacao', 'sugestao_empresa', 'avaliacao_sistema'),
    allowNull: false,
  },
  nota: {
    type: DataTypes.INTEGER, // de 1 a 5
    allowNull: true,
    validate: { min: 1, max: 5 },
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Feedback;