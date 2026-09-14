const express = require('express');
const router = express.Router();
const { login, createEmployee } = require('../controllers/authController');

router.post('/login', login);
router.post('/employees', createEmployee); // depois vamos proteger essa rota só pra admin

module.exports = router;