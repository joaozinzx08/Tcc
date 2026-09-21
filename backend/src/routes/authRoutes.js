const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const roleMiddleware = require('../middlewares/roleMiddleware');

const {
  login,
  createEmployee,
  listEmployees,
  getMe,
  updateMe,
} = require('../controllers/authController');

// Login público
router.post(
  '/login',
  login
);

// Listar colaboradores
router.get(
  '/employees',
  authMiddleware,
  roleMiddleware('admin'),
  listEmployees
);

// Criar colaborador
router.post(
  '/employees',
  authMiddleware,
  roleMiddleware('admin'),
  createEmployee
);

// Perfil
router.get(
  '/me',
  authMiddleware,
  getMe
);

router.put(
  '/me',
  authMiddleware,
  updateMe
);

module.exports = router;