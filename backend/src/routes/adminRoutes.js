const express = require('express')

const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

const {
  getDashboard,
} = require('../controllers/adminController')

router.use(authMiddleware)
router.use(roleMiddleware('admin'))

router.get('/dashboard', getDashboard)

module.exports = router