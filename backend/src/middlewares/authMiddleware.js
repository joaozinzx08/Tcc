const jwt = require('jsonwebtoken');
const { Employee } = require('../models');

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      erro: 'Acesso negado. Faça login.',
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      erro: 'Acesso negado. Faça login.',
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      erro: 'Acesso negado. Token inválido ou expirado.',
    });
  }

  try {
    const employee = await Employee.findByPk(decoded.id);

    if (!employee) {
      return res.status(401).json({
        erro: 'Acesso negado. Colaborador não encontrado.',
      });
    }

    if (employee.status === 'inativo') {
      return res.status(403).json({
        erro: 'Seu acesso está inativo. Procure o RH.',
      });
    }

    req.employee = {
      id: employee.id,
      matricula: employee.matricula,
      role: employee.role,
    };

    next();
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      erro: 'Erro ao validar acesso.',
    });
  }
}

module.exports = authMiddleware;