function roleMiddleware(...rolesPermitidas) {
  return (req, res, next) => {
    if (!req.employee) {
      return res.status(401).json({
        erro: 'Acesso negado. Faça login.',
      });
    }

    if (!rolesPermitidas.includes(req.employee.role)) {
      return res.status(403).json({
        erro: 'Acesso negado. Você não possui permissão.',
      });
    }

    next();
  };
}

module.exports = roleMiddleware;