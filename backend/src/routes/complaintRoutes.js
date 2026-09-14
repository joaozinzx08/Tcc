const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createComplaint,
  listMyComplaints,
  getComplaint,
  updateStatus,
  addResponse,
} = require('../controllers/complaintController');

// todas as rotas de reclamação exigem estar logado
router.use(authMiddleware);

router.post('/', createComplaint);
router.get('/', listMyComplaints);
router.get('/:id', getComplaint);
router.patch('/:id/status', updateStatus);
router.post('/:id/responses', addResponse);

module.exports = router;