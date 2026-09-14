const sequelize = require('../config/database');
const Employee = require('./Employee');
const Complaint = require('./Complaint');
const ComplaintResponse = require('./ComplaintResponse');
const Announcement = require('./Announcement');

// Um colaborador tem várias reclamações
Employee.hasMany(Complaint, { foreignKey: 'employee_id' });
Complaint.belongsTo(Employee, { foreignKey: 'employee_id' });

// Uma reclamação tem várias respostas (histórico/timeline)
Complaint.hasMany(ComplaintResponse, { foreignKey: 'complaint_id' });
ComplaintResponse.belongsTo(Complaint, { foreignKey: 'complaint_id' });

// Uma resposta tem um autor (colaborador ou admin)
Employee.hasMany(ComplaintResponse, { foreignKey: 'autor_id' });
ComplaintResponse.belongsTo(Employee, { foreignKey: 'autor_id' });

// Um aviso tem um autor (admin/RH)
Employee.hasMany(Announcement, { foreignKey: 'autor_id' });
Announcement.belongsTo(Employee, { foreignKey: 'autor_id' });

module.exports = {
  sequelize,
  Employee,
  Complaint,
  ComplaintResponse,
  Announcement,
};