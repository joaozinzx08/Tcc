const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createFeedback, listMyFeedbacks, listAvaliaveis } = require('../controllers/feedbackController');

router.use(authMiddleware);

router.post('/', createFeedback);
router.get('/', listMyFeedbacks);
router.get('/avaliaveis', listAvaliaveis);

module.exports = router;