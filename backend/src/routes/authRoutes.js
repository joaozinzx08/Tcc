const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const {
  login,
  createEmployee,
  getMe,
  updateMe,
} = require('../controllers/authController');

router.post('/login', login);

router.post('/employees', createEmployee); // depois vamos proteger essa rota só pra admin

router.get('/me', authMiddleware, getMe);

router.put('/me', authMiddleware, updateMe);

module.exports = router;