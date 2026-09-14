const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ComplaintResponse = sequelize.define('ComplaintResponse', {
  mensagem: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = ComplaintResponse;